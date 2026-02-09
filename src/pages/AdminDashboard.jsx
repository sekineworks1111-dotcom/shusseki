import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { setGasUrl, getGasUrl } from '../services/GasApi';
import { LayoutGrid, List, Save, User, QrCode, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const AdminDashboard = ({ members, setMembers }) => {
    const [gasUrl, setGasUrlState] = useState(getGasUrl());
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    // New State for Bot ID (needed for deep link)
    const [lineBotId, setLineBotId] = useState(localStorage.getItem('line_bot_id') || '');

    // State for QR Modal
    const [showQrFor, setShowQrFor] = useState(null);

    const handleUrlChange = (e) => setGasUrlState(e.target.value);

    const saveGasUrl = () => {
        setGasUrl(gasUrl);
        localStorage.setItem('line_bot_id', lineBotId);
        alert('設定を保存しました');
    };

    const handlePhotoUpload = (memberId) => {
        alert("写真アップロード機能はサーバー連携が必要です。\n現在はデモとして機能しません。");
    };

    const updateMemberField = (id, field, value) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const addMember = () => {
        const newMember = {
            id: `member-${Date.now()}`,
            name: '',
            ruby: '',
            photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
            status: 'pending',
            leavingTime: null,
            lineUserId: '',
            notificationMethod: 'line',
            email1: '',
            email2: '',
            notifyEntry: true,
            notifyExit: true,
            remarks: ''
        };
        setMembers(prev => [newMember, ...prev]);
    };

    const deleteMember = (id) => {
        if (window.confirm('本当にこのメンバーを削除しますか？\nこの操作は取り消せません。')) {
            setMembers(prev => prev.filter(m => m.id !== id));
        }
    };

    // Generate LINE Deep Link
    // Format: https://line.me/R/oaMessage/@BOT_ID/?text=reg:{memberId}
    // This text "reg:{memberId}" would be sent to the bot when the user scans and sends.
    // The GAS script would need to parse this to link the User ID.
    const getLineLink = (memberId) => {
        const botId = lineBotId || 'YOUR_BOT_ID';
        // Ensure @ is present if user forgot
        const cleanBotId = botId.startsWith('@') ? botId : `@${botId}`;
        return `https://line.me/R/oaMessage/${cleanBotId}/?text=reg:${memberId}`;
    };

    return (
        <div className="admin-dashboard" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>管理画面</h2>
                <button onClick={() => window.location.href = '/'} className="btn-cancel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Homeに戻る
                </button>
            </div>

            {/* Settings Section */}
            <section style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>基本設定</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>GAS Web App URL</label>
                        <input
                            type="text"
                            value={gasUrl}
                            onChange={handleUrlChange}
                            placeholder="https://script.google.com/macros/s/..."
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>LINE Bot Basic ID (@...)</label>
                        <input
                            type="text"
                            value={lineBotId}
                            onChange={(e) => setLineBotId(e.target.value)}
                            placeholder="@123abcde"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc' }}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.2rem' }}>
                            ※QRコード生成に使用します。LINE Developersコンソールで確認してください。
                        </p>
                    </div>
                    <button onClick={saveGasUrl} className="btn-present" style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} /> 設定を保存
                    </button>
                </div>
            </section>

            {/* Member Management Section */}
            <section style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
                    <h3>部員管理 ({members.length}名)</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{ padding: '0.5rem', background: viewMode === 'grid' ? '#eee' : 'transparent', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{ padding: '0.5rem', background: viewMode === 'list' ? '#eee' : 'transparent', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={addMember} className="btn-present" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                        <Plus size={18} /> メンバーを追加
                    </button>
                </div>

                {viewMode === 'list' ? (
                    /* List View */
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                    <th style={{ padding: '0.5rem' }}>写真</th>
                                    <th style={{ padding: '0.5rem' }}>名前 (漢字/かな)</th>
                                    <th style={{ padding: '0.5rem' }}>通知方法</th>
                                    <th style={{ padding: '0.5rem' }}>LINE連携 / メールアドレス</th>
                                    <th style={{ padding: '0.5rem' }}>通知設定</th>
                                    <th style={{ padding: '0.5rem' }}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    <tr key={member.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '0.5rem' }}>
                                            <img src={member.photoUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <input
                                                value={member.name}
                                                onChange={(e) => updateMemberField(member.id, 'name', e.target.value)}
                                                placeholder="漢字"
                                                style={{ display: 'block', width: '100%', marginBottom: '0.2rem', padding: '0.3rem' }}
                                            />
                                            <input
                                                value={member.ruby}
                                                onChange={(e) => updateMemberField(member.id, 'ruby', e.target.value)}
                                                placeholder="かな"
                                                style={{ display: 'block', width: '100%', padding: '0.3rem', fontSize: '0.8rem' }}
                                            />
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <select
                                                value={member.notificationMethod}
                                                onChange={(e) => updateMemberField(member.id, 'notificationMethod', e.target.value)}
                                                style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                                            >
                                                <option value="line">LINEのみ</option>
                                                <option value="email">メールのみ</option>
                                                <option value="both">LINEとメール</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            {(member.notificationMethod === 'line' || member.notificationMethod === 'both') && (
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <input
                                                        value={member.lineUserId}
                                                        onChange={(e) => updateMemberField(member.id, 'lineUserId', e.target.value)}
                                                        placeholder="LINE ID (Uxxxxxxxx...)"
                                                        style={{ width: '100%', padding: '0.3rem', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '0.2rem' }}
                                                    />
                                                </div>
                                            )}
                                            {(member.notificationMethod === 'email' || member.notificationMethod === 'both') && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                    <input
                                                        type="email"
                                                        value={member.email1}
                                                        onChange={(e) => updateMemberField(member.id, 'email1', e.target.value)}
                                                        placeholder="メールアドレス1"
                                                        style={{ width: '100%', padding: '0.3rem', fontSize: '0.8rem' }}
                                                    />
                                                    <input
                                                        type="email"
                                                        value={member.email2}
                                                        onChange={(e) => updateMemberField(member.id, 'email2', e.target.value)}
                                                        placeholder="メールアドレス2"
                                                        style={{ width: '100%', padding: '0.3rem', fontSize: '0.8rem' }}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.8rem' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={member.notifyEntry}
                                                    onChange={(e) => updateMemberField(member.id, 'notifyEntry', e.target.checked)}
                                                /> 入室
                                            </label>
                                            <label style={{ display: 'block', fontSize: '0.8rem' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={member.notifyExit}
                                                    onChange={(e) => updateMemberField(member.id, 'notifyExit', e.target.checked)}
                                                /> 退出
                                            </label>
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                                <button onClick={() => setShowQrFor(member)} className="btn-time" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
                                                    <QrCode size={14} /> 連携QR
                                                </button>
                                                <button onClick={() => deleteMember(member.id)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center', background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2', borderRadius: '4px', cursor: 'pointer' }}>
                                                    <Trash2 size={14} /> 削除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Grid View */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {members.map(member => (
                            <div key={member.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={member.photoUrl} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                        <button
                                            onClick={() => handlePhotoUpload(member.id)}
                                            style={{ position: 'absolute', bottom: -5, right: -5, background: 'white', border: '1px solid #ccc', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            <User size={12} />
                                        </button>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            value={member.name}
                                            onChange={(e) => updateMemberField(member.id, 'name', e.target.value)}
                                            placeholder="漢字"
                                            style={{ width: '100%', padding: '0.3rem', marginBottom: '0.2rem', fontWeight: 'bold' }}
                                        />
                                        <input
                                            value={member.ruby}
                                            onChange={(e) => updateMemberField(member.id, 'ruby', e.target.value)}
                                            placeholder="かな"
                                            style={{ width: '100%', padding: '0.3rem', fontSize: '0.8rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '0.5rem' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666' }}>LINE連携ID</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            value={member.lineUserId}
                                            onChange={(e) => updateMemberField(member.id, 'lineUserId', e.target.value)}
                                            placeholder="Uxxxxxxxx..."
                                            style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem', fontFamily: 'monospace' }}
                                        />
                                        <button onClick={() => setShowQrFor(member)} style={{ padding: '0.3rem', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                                            <QrCode size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={member.notifyEntry}
                                            onChange={(e) => updateMemberField(member.id, 'notifyEntry', e.target.checked)}
                                        /> 入室通知
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={member.notifyExit}
                                            onChange={(e) => updateMemberField(member.id, 'notifyExit', e.target.checked)}
                                        /> 退出通知
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* QR Code Modal */}
            {showQrFor && (
                <div className="modal-overlay" onClick={() => setShowQrFor(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '350px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>LINE連携用QRコード</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                            保護者のスマホで読み取って、メッセージを送信してください。
                        </p>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
                            <QRCode value={getLineLink(showQrFor.id)} size={200} />
                        </div>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', wordBreak: 'break-all', color: '#888' }}>
                            {getLineLink(showQrFor.id)}
                        </p>
                        <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
                            <button className="btn-large btn-cancel" onClick={() => setShowQrFor(null)}>
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
