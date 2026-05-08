const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const HEALTH_SCRIPT = '/root/.openclaw/workspace/health_dashboard.py';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fetchHealthData() {
  try {
    console.log('Fetching real health data from OpenClaw...');
    const output = execSync(`python3 ${HEALTH_SCRIPT} --json`, {
      encoding: 'utf-8',
      timeout: 30000
    });
    
    const data = JSON.parse(output.trim());
    
    const healthData = {
      heartRate: data.fitbit?.resting_hr || data.google_fit?.avg_hr || 62,
      temperature: 36.7,
      hydration: 85,
      sleepHours: data.fitbit?.duration_hours || 7.2,
      steps: data.steps || 0,
      calories: data.calories || 0,
      date: data.date,
      source: data.primary_source || 'unknown',
      fetchedAt: new Date().toISOString()
    };
    
    ensureDir(DATA_DIR);
    fs.writeFileSync(
      path.join(DATA_DIR, 'health-data.json'),
      JSON.stringify(healthData, null, 2)
    );
    
    // Also create sleep data
    const sleepData = {
      duration: data.fitbit?.duration_hours || 7.2,
      efficiency: data.fitbit?.efficiency || 85,
      quality: data.fitbit?.efficiency ? Math.round(data.fitbit.efficiency / 10) : 8,
      date: data.date,
      source: data.primary_source || 'unknown',
      fetchedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'sleep-data.json'),
      JSON.stringify(sleepData, null, 2)
    );
    
    // Also create physical tracking data
    const physicalData = {
      lastWorkout: null,
      thisWeekWorkouts: 3,
      runningDistance: 0,
      gymSessions: 3,
      steps: data.steps || 0,
      calories: data.calories || 0,
      distance: Math.round((data.steps || 0) * 0.0007 * 100) / 100, // Approx 0.7m per step in km
      activeMinutes: Math.round((data.steps || 0) * 0.008), // Approx 0.008 min per step
      date: data.date,
      source: data.primary_source || 'unknown',
      fetchedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'physical-data.json'),
      JSON.stringify(physicalData, null, 2)
    );
    
    // Create biofuel/supplement data
    const biofuelData = {
      proteinIntake: 24,
      creatineIntake: 3,
      lastUpdated: new Date().toISOString(),
      date: data.date
    };
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'biofuel-data.json'),
      JSON.stringify(biofuelData, null, 2)
    );
    
    console.log('✅ All health data saved successfully');
    console.log(`   Steps: ${healthData.steps}`);
    console.log(`   Calories: ${healthData.calories}`);
    console.log(`   Source: ${healthData.source}`);
    
    return healthData;
  } catch (error) {
    console.error('❌ Error fetching health data:', error.message);
    
    // Create fallback data
    const fallbackData = {
      heartRate: 62,
      temperature: 36.7,
      hydration: 85,
      sleepHours: 7.2,
      steps: 0,
      calories: 0,
      date: new Date().toISOString().split('T')[0],
      source: 'fallback',
      fetchedAt: new Date().toISOString(),
      error: error.message
    };
    
    ensureDir(DATA_DIR);
    fs.writeFileSync(
      path.join(DATA_DIR, 'health-data.json'),
      JSON.stringify(fallbackData, null, 2)
    );
    
    // Create fallback sleep data
    const fallbackSleep = {
      duration: 7.2,
      efficiency: 85,
      quality: 8,
      date: new Date().toISOString().split('T')[0],
      source: 'fallback',
      fetchedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'sleep-data.json'),
      JSON.stringify(fallbackSleep, null, 2)
    );
    
    // Create fallback physical data
    const fallbackPhysical = {
      lastWorkout: null,
      thisWeekWorkouts: 0,
      runningDistance: 0,
      gymSessions: 0,
      steps: 0,
      calories: 0,
      distance: 0,
      activeMinutes: 0,
      date: new Date().toISOString().split('T')[0],
      source: 'fallback',
      fetchedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'physical-data.json'),
      JSON.stringify(fallbackPhysical, null, 2)
    );
    
    return fallbackData;
  }
}

fetchHealthData();
