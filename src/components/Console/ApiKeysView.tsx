import React, { useState } from 'react';
import { ApiKeyItem } from '../../types';
import { getStoredApiKey, setStoredApiKey, getSavedKeys, saveKeysList } from '../../services/storage';
import { Key, Plus, Copy, Check, Trash2, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { Modal } from '../UI/Modal';

export const ApiKeysView: React.FC<{ onKeyUpdated: () => void }> = ({ onKeyUpdated }) => {
  const [keys, setKeys] = useState<ApiKeyItem[]>(getSavedKeys());
  const [realApiKey, setRealApiKey] = useState<string>(getStoredApiKey());
  const [savedRealKeySuccess, setSavedRealKeySuccess] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleSaveRealKey = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(realApiKey.trim());
    setSavedRealKeySuccess(true);
    onKeyUpdated();
    setTimeout(() => setSavedRealKeySuccess(false), 3000);
  };

  const handleCreateNewKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    // Generate realistic Groq API key format
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const fullKey = `gsk_${randomHex}`;
    const preview = `gsk_${fullKey.slice(4, 7)}...${fullKey.slice(-4)}`;

    const newKeyItem: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      keyPreview: preview,
      fullKey: fullKey,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Just created',
      status: 'active'
    };

    const updated = [newKeyItem, ...keys];
    setKeys(updated);
    saveKeysList(updated);
    setGeneratedKey(fullKey);
  };

  const handleRevokeKey = (id: string) => {
    const updated = keys.filter(k => k.id !== id);
    setKeys(updated);
    saveKeysList(updated);
  };

  const handleCopyKey = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#222222] mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-5 h-5 text-[#F55036]" />
            <h1 className="font-display font-bold text-2xl text-white">API Keys Management</h1>
          </div>
          <p className="text-xs text-zinc-400">
            Create simulated project keys or connect your real Groq Cloud API key for direct hardware access.
          </p>
        </div>

        <button
          onClick={() => {
            setNewKeyName('');
            setGeneratedKey(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F55036] hover:bg-[#E04027] text-white font-display font-semibold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New API Key</span>
        </button>
      </div>

      {/* Real Groq API Key Connection Card */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] mb-8 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${realApiKey ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <h3 className="font-display font-semibold text-sm text-white">
                Connect Real Groq Cloud API Key
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Want to run real API calls to Groq's official API (<code className="text-[#F55036] font-mono">api.groq.com</code>)? Paste your key from{' '}
              <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-[#F55036] underline inline-flex items-center gap-0.5">
                console.groq.com/keys <ExternalLink className="w-3 h-3" />
              </a>. If empty, the app runs the built-in high-speed LPU simulation engine.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveRealKey} className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            value={realApiKey}
            onChange={(e) => setRealApiKey(e.target.value)}
            placeholder="gsk_..."
            className="flex-1 px-4 py-2 rounded-xl bg-[#181818] border border-[#2D2D2D] text-xs font-mono text-white placeholder-zinc-500 focus:border-[#F55036] outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-white font-medium text-xs border border-[#333333] transition-colors flex items-center justify-center gap-1.5"
          >
            {savedRealKeySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-[#22C55E]">Saved!</span>
              </>
            ) : (
              <span>Save & Connect</span>
            )}
          </button>
          {realApiKey && (
            <button
              type="button"
              onClick={() => {
                setRealApiKey('');
                setStoredApiKey('');
                onKeyUpdated();
              }}
              className="px-3 py-2 rounded-xl bg-red-950/40 text-red-400 border border-red-900/40 text-xs hover:bg-red-900/40"
            >
              Disconnect
            </button>
          )}
        </form>
      </div>

      {/* Keys Table */}
      <div className="rounded-2xl border border-[#242424] bg-[#121212] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#202020] bg-[#161616] flex items-center justify-between">
          <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
            Active Keys ({keys.length})
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">
            Default permission: Full Inference Access
          </span>
        </div>

        <div className="divide-y divide-[#1E1E1E]">
          {keys.map((key) => (
            <div key={key.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">{key.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                    {key.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
                  <span className="text-zinc-300 bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#282828]">
                    {key.keyPreview}
                  </span>
                  <span>Created: {key.createdAt}</span>
                  <span>Last used: {key.lastUsed}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopyKey(key.fullKey || key.keyPreview, key.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] border border-[#2B2B2B] text-zinc-300 hover:text-white transition-colors"
                >
                  {copiedKeyId === key.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span className="text-[#22C55E]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleRevokeKey(key.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-[#1E1E1E] transition-colors"
                  title="Revoke key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Key */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Groq API Key"
      >
        {!generatedKey ? (
          <form onSubmit={handleCreateNewKey} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Key Name
              </label>
              <input
                type="text"
                required
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g. Production Backend, Web App, Local Testing"
                className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#2D2D2D] text-sm text-white placeholder-zinc-500 focus:border-[#F55036] outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#F55036] hover:bg-[#E04027] text-white text-xs font-semibold shadow-md"
              >
                Generate Key
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Please save this secret key in a safe place. You won't be able to view it again after closing this window.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111111] border border-[#262626] flex items-center justify-between font-mono text-xs text-emerald-400">
              <span className="truncate pr-2">{generatedKey}</span>
              <button
                onClick={() => handleCopyKey(generatedKey, 'modal-key')}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#202020] text-zinc-200 hover:text-white border border-[#303030] flex-shrink-0"
              >
                {copiedKeyId === 'modal-key' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
