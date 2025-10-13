import { useEffect, useState } from 'react';
import { Plus, Briefcase, LogOut } from 'lucide-react';
import { supabase, JobApplication } from '../lib/supabase';
import { ApplicationForm, ApplicationFormData } from './ApplicationForm';
import { ApplicationTable } from './ApplicationTable';
import { CelebrationModal } from './CelebrationModal';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'accepted' | 'rejected'>('accepted');
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user?.id)
        .order('apply_date', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: ApplicationFormData) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          company: formData.company,
          position: formData.position,
          status: formData.status,
          apply_date: formData.apply_date,
          response_date: formData.response_date || null,
          job_url: formData.job_url || null,
          reason: formData.reason || null,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setApplications([data, ...applications]);

        if (formData.status === 'Accepted') {
          setCelebrationType('accepted');
          setShowCelebration(true);
        } else if (formData.status === 'Rejected') {
          setCelebrationType('rejected');
          setShowCelebration(true);
        }
      }
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const oldApp = applications.find(app => app.id === id);
    const oldStatus = oldApp?.status;

    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.map(app =>
        app.id === id ? { ...app, status } : app
      ));

      if (oldStatus !== status) {
        if (status === 'Accepted') {
          setCelebrationType('accepted');
          setShowCelebration(true);
        } else if (status === 'Rejected') {
          setCelebrationType('rejected');
          setShowCelebration(true);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800/50 backdrop-blur-sm bg-black/50 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Briefcase className="text-blue-400" size={24} />
            </div>
            <span className="text-xl font-semibold">Tracker</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Your Applications</h1>
              <p className="text-zinc-500 text-sm mt-1">
                Track and manage your job applications
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            New Application
          </button>
        </div>

        <div className="mb-6 flex items-center gap-4 text-sm">
          <div className="px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800/50">
            <span className="text-zinc-400">Total: </span>
            <span className="font-semibold text-white">{applications.length}</span>
          </div>
          <div className="px-4 py-2 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/50">
            <span className="text-blue-400">Applied: </span>
            <span className="font-semibold text-white">
              {applications.filter(app => app.status === 'Applied').length}
            </span>
          </div>
          <div className="px-4 py-2 bg-green-900/20 backdrop-blur-sm rounded-lg border border-green-800/50">
            <span className="text-green-400">Accepted: </span>
            <span className="font-semibold text-white">
              {applications.filter(app => app.status === 'Accepted').length}
            </span>
          </div>
          <div className="px-4 py-2 bg-red-900/20 backdrop-blur-sm rounded-lg border border-red-800/50">
            <span className="text-red-400">Rejected: </span>
            <span className="font-semibold text-white">
              {applications.filter(app => app.status === 'Rejected').length}
            </span>
          </div>
        </div>

        <ApplicationTable
          applications={applications}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      {showForm && (
        <ApplicationForm
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {showCelebration && (
        <CelebrationModal
          onClose={() => setShowCelebration(false)}
          isAccepted={celebrationType === 'accepted'}
        />
      )}
    </div>
  );
}
