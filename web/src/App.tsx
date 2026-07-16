import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import LandingPage from '@/components/landing/LandingPage';
import DashboardPage from '@/components/dashboard/DashboardPage';
import UploadPage from '@/components/upload/UploadPage';
import ModelSelectionPage from '@/components/models/ModelSelectionPage';
import AnalysisPage from '@/components/analysis/AnalysisPage';
import ResultsPage from '@/components/results/ResultsPage';
import HistoryPage from '@/components/history/HistoryPage';
import SettingsPage from '@/components/settings/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/models" element={<ModelSelectionPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
