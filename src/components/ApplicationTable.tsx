import { useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { JobApplication } from '../lib/supabase';

interface ApplicationTableProps {
  applications: JobApplication[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function ApplicationTable({ applications, onDelete, onStatusChange }: ApplicationTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(applications.map(app => app.id)));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-600/90 text-blue-100';
      case 'rejected':
        return 'bg-red-600/90 text-red-100';
      case 'accepted':
        return 'bg-green-600/90 text-green-100';
      case 'interview':
        return 'bg-purple-600/90 text-purple-100';
      default:
        return 'bg-zinc-600/90 text-zinc-100';
    }
  };

  const getPositionColor = (position: string) => {
    const lowerPos = position.toLowerCase();
    if (lowerPos.includes('ai') || lowerPos.includes('ml')) {
      return 'bg-amber-700/80 text-amber-100';
    } else if (lowerPos.includes('engineering')) {
      return 'bg-orange-700/80 text-orange-100';
    } else if (lowerPos.includes('fullstack') || lowerPos.includes('full stack')) {
      return 'bg-zinc-700/80 text-zinc-100';
    } else if (lowerPos.includes('flutter')) {
      return 'bg-green-700/80 text-green-100';
    } else {
      return 'bg-purple-700/80 text-purple-100';
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedIds.size === applications.length && applications.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Company</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Position</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Apply Date</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Response Date</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Job URL</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Reason</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-zinc-800/30 hover:bg-zinc-800/30 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(app.id)}
                    onChange={() => toggleSelection(app.id)}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                  />
                </td>
                <td className="p-4 text-sm text-white font-medium">{app.company}</td>
                <td className="p-4">
                  <select
                    value={app.status}
                    onChange={(e) => onStatusChange(app.id, e.target.value)}
                    className={`${getStatusColor(app.status)} px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4">
                  <span className={`${getPositionColor(app.position)} px-3 py-1 rounded-md text-xs font-medium inline-block`}>
                    {app.position}
                  </span>
                </td>
                <td className="p-4 text-sm text-zinc-300">{formatDate(app.apply_date)}</td>
                <td className="p-4 text-sm text-zinc-300">
                  {app.response_date ? formatDate(app.response_date) : '-'}
                </td>
                <td className="p-4 text-sm">
                  {app.job_url ? (
                    <a
                      href={app.job_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <span className="max-w-[200px] truncate">{app.job_url}</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-zinc-600">-</span>
                  )}
                </td>
                <td className="p-4 text-sm text-zinc-400 max-w-[200px] truncate">
                  {app.reason || '-'}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onDelete(app.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-zinc-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          <p>No applications yet. Click "New Application" to get started.</p>
        </div>
      )}
    </div>
  );
}
