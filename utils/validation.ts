export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export function validateSupplementData(protein: number, creatine: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate protein intake
  if (typeof protein !== 'number' || isNaN(protein)) {
    errors.push('Protein intake must be a valid number');
  } else if (protein < 0) {
    errors.push('Protein intake cannot be negative');
  } else if (protein > 200) {
    warnings.push('Protein intake seems unusually high (>200g)');
  }

  // Validate creatine intake
  if (typeof creatine !== 'number' || isNaN(creatine)) {
    errors.push('Creatine intake must be a valid number');
  } else if (creatine < 0) {
    errors.push('Creatine intake cannot be negative');
  } else if (creatine > 20) {
    warnings.push('Creatine intake seems unusually high (>20g)');
  }

  // Check if targets are met
  if (protein < 30) {
    warnings.push(`Protein target not met: ${protein}g of 30g`);
  }

  if (creatine < 3) {
    warnings.push(`Creatine target not met: ${creatine}g of 3g`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

export function validateRunningMetrics(distance: number, duration: number, calories: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate distance
  if (typeof distance !== 'number' || isNaN(distance)) {
    errors.push('Distance must be a valid number');
  } else if (distance < 0) {
    errors.push('Distance cannot be negative');
  } else if (distance > 100) {
    warnings.push('Distance seems unusually high (>100km)');
  }

  // Validate duration
  if (typeof duration !== 'number' || isNaN(duration)) {
    errors.push('Duration must be a valid number');
  } else if (duration < 0) {
    errors.push('Duration cannot be negative');
  } else if (duration > 300) {
    warnings.push('Duration seems unusually long (>300 minutes)');
  }

  // Validate calories
  if (typeof calories !== 'number' || isNaN(calories)) {
    errors.push('Calories must be a valid number');
  } else if (calories < 0) {
    errors.push('Calories cannot be negative');
  } else if (calories > 5000) {
    warnings.push('Calories burned seems unusually high (>5000)');
  }

  // Check for reasonable ratios
  if (distance > 0 && calories / distance < 30) {
    warnings.push('Calories burned per km seems low (<30 cal/km)');
  }

  if (distance > 0 && duration > 0) {
    const pace = duration / distance; // minutes per km
    if (pace < 2) {
      warnings.push('Pace seems unusually fast (<2 min/km)');
    } else if (pace > 30) {
      warnings.push('Pace seems unusually slow (>30 min/km)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

export function validateHealthMetrics(heartRate: number, temperature: number, hydration: number, sleepHours: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate heart rate
  if (typeof heartRate !== 'number' || isNaN(heartRate)) {
    errors.push('Heart rate must be a valid number');
  } else if (heartRate < 20) {
    errors.push('Heart rate is dangerously low (<20 bpm)');
  } else if (heartRate > 300) {
    errors.push('Heart rate is dangerously high (>300 bpm)');
  } else if (heartRate < 40) {
    warnings.push('Heart rate is low (<40 bpm)');
  } else if (heartRate > 180) {
    warnings.push('Heart rate is high (>180 bpm)');
  }

  // Validate temperature
  if (typeof temperature !== 'number' || isNaN(temperature)) {
    errors.push('Temperature must be a valid number');
  } else if (temperature < 30) {
    errors.push('Body temperature is dangerously low (<30°C)');
  } else if (temperature > 45) {
    errors.push('Body temperature is dangerously high (>45°C)');
  } else if (temperature < 35) {
    warnings.push('Body temperature is low (<35°C)');
  } else if (temperature > 38) {
    warnings.push('Body temperature is high (>38°C)');
  }

  // Validate hydration
  if (typeof hydration !== 'number' || isNaN(hydration)) {
    errors.push('Hydration must be a valid number');
  } else if (hydration < 0) {
    errors.push('Hydration cannot be negative');
  } else if (hydration > 100) {
    errors.push('Hydration cannot exceed 100%');
  } else if (hydration < 70) {
    warnings.push('Hydration is low (<70%)');
  }

  // Validate sleep hours
  if (typeof sleepHours !== 'number' || isNaN(sleepHours)) {
    errors.push('Sleep hours must be a valid number');
  } else if (sleepHours < 0) {
    errors.push('Sleep hours cannot be negative');
  } else if (sleepHours > 24) {
    errors.push('Sleep hours cannot exceed 24 hours');
  } else if (sleepHours < 3) {
    warnings.push('Sleep hours are very low (<3 hours)');
  } else if (sleepHours > 12) {
    warnings.push('Sleep hours seem unusually high (>12 hours)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

export function validateTrainingVolume(volume: number, trend: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate volume
  if (typeof volume !== 'number' || isNaN(volume)) {
    errors.push('Training volume must be a valid number');
  } else if (volume < 0) {
    errors.push('Training volume cannot be negative');
  } else if (volume > 10000) {
    warnings.push('Training volume seems unusually high (>10000 units)');
  }

  // Validate trend
  if (!['increasing', 'decreasing', 'stable'].includes(trend)) {
    errors.push('Invalid trend value. Must be "increasing", "decreasing", or "stable"');
  }

  // Check for reasonable changes
  if (volume > 0 && volume < 100) {
    warnings.push('Training volume is quite low (<100 units)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}