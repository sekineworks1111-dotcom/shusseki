import { useState } from 'react';

const AttendanceModal = ({ member, onClose, onConfirm }) => {
    const [step, setStep] = useState('confirm_identity'); // 'confirm_identity', 'select_action', 'select_time'

    if (!member) return null;

    // Step 1: Identity Confirmation
    if (step === 'confirm_identity') {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="img-wrapper" style={{ margin: '0 auto 1rem', width: '100px', height: '100px' }}>
                        <img src={member.photoUrl} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid pink' }} />
                    </div>
                    <h2 className="modal-title">{member.name}さんで<br />間違いないですか？</h2>
                    <div className="modal-actions">
                        <button className="btn-large btn-present" onClick={() => setStep('select_action')}>
                            はい
                        </button>
                        <button className="btn-large btn-cancel" onClick={onClose}>
                            いいえ（戻る）
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Select Action
    if (step === 'select_action') {
        const isPresent = member.status === 'present' || member.status === 'leaving_early';

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">{member.name}さんの<br />{isPresent ? '退出登録' : '出席登録'}</h2>
                    <div className="modal-actions">
                        {!isPresent ? (
                            <>
                                <button className="btn-large btn-present" onClick={() => onConfirm(member.id, 'present')}>
                                    出席
                                </button>
                                <button className="btn-large btn-early" onClick={() => setStep('select_time')}>
                                    早く帰る
                                </button>
                            </>
                        ) : (
                            <button className="btn-large btn-leave" onClick={() => onConfirm(member.id, 'left')}>
                                帰る（練習終了）
                            </button>
                        )}
                        <button className="btn-large btn-cancel" onClick={onClose}>
                            キャンセル
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 3: Select Leaving Time
    if (step === 'select_time') {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">何時頃帰りますか？</h2>
                    <div className="time-options">
                        <button className="btn-time" onClick={() => onConfirm(member.id, 'leaving_early', '17:00')}>17:00</button>
                        <button className="btn-time" onClick={() => onConfirm(member.id, 'leaving_early', '17:30')}>17:30</button>
                        <button className="btn-time" onClick={() => onConfirm(member.id, 'leaving_early', '18:00')}>18:00</button>
                        <button className="btn-time" onClick={() => onConfirm(member.id, 'leaving_early', '18:30')}>18:30</button>
                    </div>
                    <div className="modal-actions" style={{ marginTop: '1rem' }}>
                        <button className="btn-large btn-cancel" onClick={() => setStep('select_action')}>
                            戻る
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AttendanceModal;
