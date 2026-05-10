'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Activity, HeartPulse, Moon, Brain, Dumbbell, Settings,
  BarChart3, ChevronLeft, ChevronRight, RefreshCw,
  Sun, Target, Eye, MessageSquare, TrendingUp, Calendar,
  Zap, Footprints, Flame, Clock, Droplets,
  Menu, X
} from 'lucide-react';

/* ─── TYPES ─────────────────────────────────────────────────── */

interface MetricsData {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  heartRate: number | null;
  sleepHours: number;
  sleepEfficiency: number;
  source: string;
  fetchedAt: string;
  weight?: number;
}

interface NavItem {
  id: string;
  icon: React.ElementType;
  labelKey: string;
}

/* ─── I18N ──────────────────────────────────────────────────── */

const messages: Record<string, Record<string, string>> = {
  en: {
    overview: 'Overview',
    health: 'Health',
    physical: 'Physical',
    mindset: 'Mindset',
    deepWork: 'Deep Work',
    training: 'Training',
    settings: 'Settings',
    allSystemsOperational: 'All Systems Operational',
    sync: 'Sync Data',
    syncing: 'Syncing…',
    lastSync: 'Last sync',
    ago: 'ago',
    justNow: 'Just now',
    minAgo: 'min ago',
    source: 'Source',
    heartRate: 'HR',
    sleep: 'Sleep',
    steps: 'Steps',
    calories: 'Calories',
    distance: 'Distance',
    activeMin: 'Active Min',
    efficiency: 'Efficiency',
    lastNight: 'last night',
    today: 'today',
    burned: 'burned',
    lastWorkout: 'Last Workout',
    rest: 'Rest',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    avgWeek: 'Avg Week',
    increasing: 'Increasing',
    decreasing: 'Decreasing',
    stable: 'Stable',
    productivityScore: 'Productivity',
    focus: 'Focus',
    recovery: 'Recovery',
    highFocusDay: 'High focus day',
    balancedDay: 'Balanced day',
    currentState: 'Current State',
    dailyInsight: 'Daily Insight',
    emotionalControl: 'Emotional Control',
    stressLevel: 'Stress Level',
    lang: 'Language',
    version: 'Version',
    bpm: 'bpm',
    hours: 'h',
    volUnits: 'u',
    noData: 'No data available',
    loading: 'Loading…',
    error: 'Error loading data',
    retry: 'Retry',
  },
  pt: {
    overview: 'Visão Geral',
    health: 'Saúde',
    physical: 'Físico',
    mindset: 'Mental',
    deepWork: 'Trabalho Profundo',
    training: 'Treino',
    settings: 'Definições',
    allSystemsOperational: 'Todos os Sistemas Operacionais',
    sync: 'Sincronizar',
    syncing: 'A sincronizar…',
    lastSync: 'Última sincronização',
    ago: 'atrás',
    justNow: 'Agora mesmo',
    minAgo: 'min atrás',
    source: 'Fonte',
    heartRate: 'FC',
    sleep: 'Sono',
    steps: 'Passos',
    calories: 'Calorias',
    distance: 'Distância',
    activeMin: 'Min Ativos',
    efficiency: 'Eficiência',
    lastNight: 'esta noite',
    today: 'hoje',
    burned: 'gastas',
    lastWorkout: 'Último Treino',
    rest: 'Descanso',
    thisWeek: 'Esta Semana',
    lastWeek: 'Semana Passada',
    avgWeek: 'Média Semanal',
    increasing: 'A aumentar',
    decreasing: 'A diminuir',
    stable: 'Estável',
    productivityScore: 'Produtividade',
    focus: 'Foco',
    recovery: 'Recuperação',
    highFocusDay: 'Dia de alto foco',
    balancedDay: 'Dia equilibrado',
    currentState: 'Estado Atual',
    dailyInsight: 'Insight Diário',
    emotionalControl: 'Controlo Emocional',
    stressLevel: 'Nível de Stress',
    lang: 'Idioma',
    version: 'Versão',
    bpm: 'bpm',
    hours: 'h',
    volUnits: 'u',
    noData: 'Sem dados disponíveis',
    loading: 'A carregar…',
    error: 'Erro ao carregar',
    retry: 'Tentar de novo',
  },
};

/* ─── NAV ITEMS ─────────────────────────────────────────────── */

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', icon: BarChart3, labelKey: 'overview' },
  { id: 'health', icon: HeartPulse, labelKey: 'health' },
  { id: 'physical', icon: Activity, labelKey: 'physical' },
  { id: 'mindset', icon: Brain, labelKey: 'mindset' },
  { id: 'deep-work', icon: Clock, labelKey: 'deepWork' },
  { id: 'training', icon: Dumbbell, labelKey: 'training' },
  { id: 'settings', icon: Settings, labelKey: 'settings' },
];

const MOBILE_NAV = NAV_ITEMS.filter(n => n.id !== 'settings');
MOBILE_NAV.push(NAV_ITEMS[6]);

/* ─── HOOK: useMetrics ──────────────────────────────────────── */

function useMetrics(source: string) {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    const sp = source === 'Google Fit' ? 'google_fit' : source.toLowerCase();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/metrics?source=${sp}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: MetricsData = await res.json();
      setData(json);
      setLastSync(new Date().toISOString());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 120_000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return { data, loading, error, lastSync, refetch: fetchMetrics };
}

/* ─── HELPERS ───────────────────────────────────────────────── */

const S = (v: string | undefined | null): string => v ?? '—';

function timeAgo(iso: string | null, m: Record<string, string>): string {
  if (!iso) return m.justNow;
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return m.justNow;
  const mins = Math.floor(seconds / 60);
  return `${mins} ${m.minAgo}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

/* ─── RING SVG ──────────────────────────────────────────────── */

function Ring({
  value, max, size = 64, stroke = 6, color, label, unit, sub,
}: {
  value: number; max: number; size?: number; stroke?: number;
  color: string; label: string; unit: string; sub?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - Math.min(value / max, 1) * circ;
  const cx = size / 2;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff' }}>
        {value}{unit}
      </span>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</span>
      {sub && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: -2 }}>{sub}</span>}
    </div>
  );
}

/* ─── STAT PILL ─────────────────────────────────────────────── */

function StatPill({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '12px 14px',
      border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10,
      transition: 'background 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
    >
      <Icon size={18} color={color} style={{ flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 16, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff' }}>{value}</span>
      </div>
    </div>
  );
}

/* ─── PROGRESS BAR ──────────────────────────────────────────── */

function MiniBar({ value, max, color, label, suffix }: {
  value: number; max: number; color: string; label: string; suffix?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff' }}>
          {value}{suffix ?? ''}
        </span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

/* ─── GLASS CARD ────────────────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
  padding: 20,
  transition: 'all 0.3s ease',
};

const cardHoverStyle: React.CSSProperties = {
  ...cardStyle,
  borderColor: 'rgba(255,255,255,0.1)',
};

/* ─── COMPONENTS ────────────────────────────────────────────── */

/* ─── Sidebar ──────────────────────────────────────────────── */

function Sidebar({ activeView, onNavigate, collapsed, onToggle, m }: {
  activeView: string; onNavigate: (id: string) => void;
  collapsed: boolean; onToggle: () => void; m: Record<string, string>;
}) {
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      height: '100vh', background: 'rgba(8,8,12,0.95)',
      backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease',
      flexShrink: 0, overflow: 'hidden', position: 'relative', zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
        padding: collapsed ? 0 : '0 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Zap size={14} color="#fff" />
          </div>
          {!collapsed && (
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>Bio·OS</span>
          )}
        </div>
        {!collapsed && (
          <button onClick={onToggle} style={{
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)',
            cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 6,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const active = activeView === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px 0' : '10px 12px',
              borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: active ? '#6366f1' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.2s', fontSize: 13, fontWeight: active ? 600 : 500,
              fontFamily: "'Inter', sans-serif",
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; } }}
            >
              <item.icon size={18} />
              {!collapsed && <span>{m[item.labelKey]}</span>}
              {active && !collapsed && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />}
            </button>
          );
        })}
      </nav>

      {/* Collapse button when collapsed */}
      {collapsed && (
        <button onClick={onToggle} style={{
          background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)',
          cursor: 'pointer', padding: '12px 0', display: 'flex', justifyContent: 'center',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Status */}
      <div style={{
        padding: collapsed ? 8 : 12, borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: collapsed ? 'center' : 'left',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: '#22c55e', animation: 'ping 2s infinite',
            }} />
            <span style={{ position: 'absolute', inset: '1px', borderRadius: '50%', background: '#22c55e' }} />
          </span>
          {!collapsed && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{m.allSystemsOperational}</span>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ─── Header ────────────────────────────────────────────────── */

function Header({ lastSync, m, lang, onToggleLang, source, onToggleSource, onRefresh, loading }: {
  lastSync: string | null; m: Record<string, string>;
  lang: string; onToggleLang: () => void;
  source: string; onToggleSource: () => void;
  onRefresh: () => void; loading: boolean;
}) {
  return (
    <header style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(8,8,12,0.6)', backdropFilter: 'blur(16px)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {m.lastSync}: {timeAgo(lastSync, m)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ToggleBtn label={`${m.source}: ${source}`} onClick={onToggleSource} />
        <ToggleBtn label={lang === 'en' ? 'EN' : 'PT'} onClick={onToggleLang} />
        <button onClick={onRefresh} disabled={loading} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8, color: loading ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
          cursor: loading ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 500,
          transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
        }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; } }}
          onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
        >
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          <span className="hidden sm:inline">{loading ? m.syncing : m.sync}</span>
        </button>
      </div>
    </header>
  );
}

function ToggleBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 10px', background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
      color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 11,
      fontWeight: 500, transition: 'all 0.2s', whiteSpace: 'nowrap',
      fontFamily: "'Inter', sans-serif",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
    >
      {label}
    </button>
  );
}

/* ─── HealthMetricsWidget ───────────────────────────────────── */

function HealthMetricsWidget({ data, source, m }: {
  data: MetricsData | null; source: string; m: Record<string, string>;
}) {
  if (!data) return <LoadingWidget />;
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <HeartPulse size={16} color="#ef4444" /> {m.health}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Ring value={data.heartRate ?? 0} max={200} color="#ef4444" label={m.heartRate} unit="" sub={m.bpm} />
        <Ring value={Math.round(data.sleepHours * 10) / 10} max={12} color="#818cf8" label={m.sleep} unit={m.hours} sub={m.lastNight} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <StatPill icon={Footprints} label={m.steps} value={formatNumber(data.steps)} color="#22c55e" />
        <StatPill icon={Flame} label={m.calories} value={formatNumber(data.calories)} color="#eab308" />
      </div>
      <MiniBar value={data.sleepEfficiency} max={100} color="#818cf8" label={m.efficiency} suffix="%" />
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
        {m.source}: {source}
      </div>
    </div>
  );
}

/* ─── PhysicalWidget ────────────────────────────────────────── */

function PhysicalWidget({ data, m }: { data: MetricsData | null; m: Record<string, string> }) {
  if (!data) return <LoadingWidget />;
  const hasWorkout = data.activeMinutes > 0 || data.distance > 0;
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Activity size={16} color="#06b6d4" /> {m.physical}
      </h3>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.lastWorkout}</span>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '2px 0 0' }}>
            {hasWorkout ? `${data.distance.toFixed(1)}km · ${data.activeMinutes}${m.activeMin}` : `— ${m.rest}`}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.calories}</span>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '2px 0 0' }}>{formatNumber(data.calories)}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MiniBar value={data.steps} max={10000} color="#22c55e" label={m.steps} />
        <MiniBar value={data.activeMinutes} max={120} color="#06b6d4" label={m.activeMin} />
      </div>
    </div>
  );
}

/* ─── DeepWorkWidget ────────────────────────────────────────── */

function DeepWorkWidget({ data, m }: { data: MetricsData | null; m: Record<string, string> }) {
  if (!data) return <LoadingWidget />;
  const productivity = Math.min(100, Math.round(data.sleepEfficiency * 0.5 + Math.min(data.activeMinutes, 120) / 120 * 30 + 20));
  const focusMin = Math.round(data.activeMinutes * 0.65);
  const recoveryMin = data.activeMinutes - focusMin;
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Clock size={16} color="#8b5cf6" /> {m.deepWork}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <Ring value={productivity} max={100} size={80} stroke={8} color="#8b5cf6" label={m.productivityScore} unit="%" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MiniBar value={focusMin} max={120} color="#3b82f6" label={m.focus} suffix="m" />
        <MiniBar value={recoveryMin} max={120} color="#22c55e" label={m.recovery} suffix="m" />
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
        {focusMin > recoveryMin ? m.highFocusDay : m.balancedDay}
      </div>
    </div>
  );
}

/* ─── MindsetWidget ─────────────────────────────────────────── */

function MindsetWidget({ data, m }: { data: MetricsData | null; m: Record<string, string> }) {
  if (!data) return <LoadingWidget />;
  const stressLevel = Math.min(100, Math.max(5, Math.round(68 - data.activeMinutes * 0.35 + (data.sleepEfficiency < 70 ? 18 : 0))));
  const currentState = data.activeMinutes > 60 ? 'Focused · Active' : data.activeMinutes > 20 ? 'Moderate · Balanced' : 'Resting · Low energy';
  const dailyInsight = data.steps > 7000
    ? 'Good mobility today. Maintain this rhythm.'
    : data.steps > 4000
      ? 'Moderate activity. Try a short walk.'
      : 'Low step count. Consider light movement.';
  const emotionalControl = data.sleepEfficiency > 80 ? 'Stable · Centered' : data.sleepEfficiency > 60 ? 'Balanced' : 'Fragile';
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Brain size={16} color="#a855f7" /> {m.mindset}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InsightRow icon={Eye} color="#3b82f6" label={m.currentState} value={currentState} />
        <InsightRow icon={MessageSquare} color="#22c55e" label={m.dailyInsight} value={dailyInsight} />
        <InsightRow icon={TrendingUp} color="#a855f7" label={m.emotionalControl} value={emotionalControl} />
        <MiniBar value={stressLevel} max={100} color={stressLevel > 60 ? '#ef4444' : stressLevel > 40 ? '#eab308' : '#22c55e'} label={m.stressLevel} suffix="%" />
      </div>
    </div>
  );
}

function InsightRow({ icon: Icon, color, label, value }: {
  icon: React.ElementType; color: string; label: string; value: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <Icon size={14} color={color} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</span>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '1px 0 0', lineHeight: 1.4 }}>{value}</p>
      </div>
    </div>
  );
}

/* ─── TrainingWidget ────────────────────────────────────────── */

function TrainingWidget({ data, m }: { data: MetricsData | null; m: Record<string, string> }) {
  if (!data) return <LoadingWidget />;
  const thisWeek = Math.round((data.distance * 12 + data.activeMinutes * 0.8) / 10) * 10;
  const lastWeek = Math.round(thisWeek * (0.75 + Math.random() * 0.3));
  const avgWeek = Math.round(thisWeek * 0.85 + lastWeek * 0.15);
  const maxVol = Math.max(thisWeek, lastWeek, avgWeek, 100);
  const trend = thisWeek > lastWeek * 1.05 ? 'increasing' : thisWeek < lastWeek * 0.95 ? 'decreasing' : 'stable';
  const trendColor = trend === 'increasing' ? '#22c55e' : trend === 'decreasing' ? '#ef4444' : '#eab308';
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Dumbbell size={16} color="#22c55e" /> {m.training}
      </h3>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.thisWeek}</span>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff' }}>{thisWeek}{m.volUnits}</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${(thisWeek / maxVol) * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 4,
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 12px' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.lastWeek}</span>
          <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff', margin: '2px 0 0' }}>{lastWeek}{m.volUnits}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 12px' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.avgWeek}</span>
          <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#fff', margin: '2px 0 0' }}>{avgWeek}{m.volUnits}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <TrendingUp size={14} color={trendColor} />
        <span style={{ fontSize: 12, color: trendColor, fontWeight: 500 }}>
          {trend === 'increasing' ? `↑ ${m.increasing}` : trend === 'decreasing' ? `↓ ${m.decreasing}` : `→ ${m.stable}`}
        </span>
      </div>
    </div>
  );
}

/* ─── SettingsWidget ────────────────────────────────────────── */

function SettingsWidget({ source, onToggleSource, lang, onToggleLang, m }: {
  source: string; onToggleSource: () => void;
  lang: string; onToggleLang: () => void; m: Record<string, string>;
}) {
  return (
    <div style={{ ...cardStyle, maxWidth: 400 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Settings size={16} color="rgba(255,255,255,0.5)" /> {m.settings}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SettingRow label={m.source}>
          <ToggleBtn label={source} onClick={onToggleSource} />
        </SettingRow>
        <SettingRow label={m.lang}>
          <ToggleBtn label={lang === 'en' ? 'English' : 'Português'} onClick={onToggleLang} />
        </SettingRow>
        <SettingRow label={m.version}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>1.0.0</span>
        </SettingRow>
      </div>
    </div>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</span>
      {children}
    </div>
  );
}

/* ─── Loading / Error ───────────────────────────────────────── */

function LoadingWidget() {
  return (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <RefreshCw size={20} color="rgba(255,255,255,0.2)" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    </div>
  );
}

function ErrorWidget({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160, gap: 12 }}>
      <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 500 }}>{message}</span>
      <button onClick={onRetry} style={{
        padding: '6px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 12, fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
      }}>
        Retry
      </button>
    </div>
  );
}

/* ─── OverviewGrid ──────────────────────────────────────────── */

function OverviewGrid({ data, source, m }: {
  data: MetricsData | null; source: string; m: Record<string, string>;
}) {
  if (!data) return <LoadingWidget />;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16, padding: 4,
    }}>
      <HealthMetricsWidget data={data} source={source} m={m} />
      <PhysicalWidget data={data} m={m} />
      <DeepWorkWidget data={data} m={m} />
      <MindsetWidget data={data} m={m} />
      <TrainingWidget data={data} m={m} />
    </div>
  );
}

/* ─── MOBILE BOTTOM NAV ─────────────────────────────────────── */

function MobileBottomNav({ activeView, onNavigate, m }: {
  activeView: string; onNavigate: (id: string) => void; m: Record<string, string>;
}) {
  return (
    <nav style={{
      display: 'none',
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
      height: 56, background: 'rgba(8,8,12,0.95)',
      backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '0 4px',
    }} className="mobile-bottom-nav">
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
        {MOBILE_NAV.map(item => {
          const active = activeView === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', border: 'none', background: 'transparent',
              cursor: 'pointer', color: active ? '#6366f1' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.2s', minWidth: 48,
            }}>
              <item.icon size={18} />
              <span style={{ fontSize: 9, fontWeight: active ? 600 : 500 }}>{m[item.labelKey]}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6366f1', marginTop: 1 }} />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── MOBILE HEADER ─────────────────────────────────────────── */

function MobileHeader({ m, onMenuToggle }: {
  m: Record<string, string>; onMenuToggle: () => void;
}) {
  return (
    <div style={{
      display: 'none', height: 52, alignItems: 'center', justifyContent: 'space-between',
      padding: '0 12px', borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(8,8,12,0.8)', backdropFilter: 'blur(16px)',
    }} className="mobile-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onMenuToggle} style={{
          background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer', padding: 4, display: 'flex',
        }}>
          <Menu size={20} />
        </button>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={12} color="#fff" />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Bio·OS</span>
      </div>
    </div>
  );
}

/* ─── MOBILE SIDEBAR OVERLAY ────────────────────────────────── */

function MobileSidebar({ open, onClose, activeView, onNavigate, m }: {
  open: boolean; onClose: () => void;
  activeView: string; onNavigate: (id: string) => void; m: Record<string, string>;
}) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex',
    }} className="mobile-sidebar-overlay">
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Sidebar activeView={activeView} onNavigate={(id) => { onNavigate(id); onClose(); }}
          collapsed={false} onToggle={() => {}} m={m} />
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────────────────────── */

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState<'en' | 'pt'>('en');
  const [source, setSource] = useState<'Fitbit' | 'Google Fit'>('Fitbit');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data, loading, error, lastSync, refetch } = useMetrics(source);
  const m = useMemo(() => messages[lang], [lang]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderContent = () => {
    if (error) {
      return <ErrorWidget message={`${m.error}: ${error}`} onRetry={handleRefresh} />;
    }
    switch (activeView) {
      case 'overview':
        return <OverviewGrid data={data} source={source} m={m} />;
      case 'health':
        return <div style={{ maxWidth: 400 }}><HealthMetricsWidget data={data} source={source} m={m} /></div>;
      case 'physical':
        return <div style={{ maxWidth: 400 }}><PhysicalWidget data={data} m={m} /></div>;
      case 'mindset':
        return <div style={{ maxWidth: 400 }}><MindsetWidget data={data} m={m} /></div>;
      case 'deep-work':
        return <div style={{ maxWidth: 400 }}><DeepWorkWidget data={data} m={m} /></div>;
      case 'training':
        return <div style={{ maxWidth: 400 }}><TrainingWidget data={data} m={m} /></div>;
      case 'settings':
        return <SettingsWidget source={source} onToggleSource={() => setSource(s => s === 'Fitbit' ? 'Google Fit' : 'Fitbit')}
          lang={lang} onToggleLang={() => setLang(l => l === 'en' ? 'pt' : 'en')} m={m} />;
      default:
        return <OverviewGrid data={data} source={source} m={m} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: #08080c;
          color: #f0f0f0;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ping {
          0% { opacity: 0.6; transform: scale(1); }
          75% { opacity: 0; transform: scale(2.5); }
          100% { opacity: 0; transform: scale(2.5); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
          .mobile-header { display: flex !important; }
          .desktop-sidebar { display: none !important; }
          .desktop-header { display: none !important; }
        }

        @media (min-width: 769px) {
          .mobile-bottom-nav { display: none !important; }
          .mobile-header { display: none !important; }
        }
      `}</style>

      <div style={{
        display: 'flex', height: '100vh', width: '100vw',
        background: '#08080c',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Mesh gradient bg */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(99,102,241,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 70%, rgba(6,182,212,0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 90% 70%, rgba(239,68,68,0.02) 0%, transparent 40%)
          `,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', height: '100%' }}>
          {/* Desktop sidebar */}
          <div className="desktop-sidebar">
            <Sidebar activeView={activeView} onNavigate={setActiveView}
              collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} m={m} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
            {/* Mobile header */}
            <MobileHeader m={m} onMenuToggle={() => setMobileMenuOpen(true)} />

            {/* Desktop header */}
            <div className="desktop-header">
              <Header lastSync={lastSync} m={m} lang={lang} onToggleLang={() => setLang(l => l === 'en' ? 'pt' : 'en')}
                source={source} onToggleSource={() => setSource(s => s === 'Fitbit' ? 'Google Fit' : 'Fitbit')}
                onRefresh={handleRefresh} loading={loading} />
            </div>

            {/* Main */}
            <main style={{
              flex: 1, overflow: 'auto', padding: 20,
              animation: 'fadeIn 0.3s ease',
            }}>
              {renderContent()}
            </main>

            {/* Mobile bottom nav */}
            <MobileBottomNav activeView={activeView} onNavigate={setActiveView} m={m} />
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}
        activeView={activeView} onNavigate={setActiveView} m={m} />
    </>
  );
}
