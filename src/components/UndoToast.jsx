import { Undo } from 'lucide-react';

const UndoToast = ({ message, onUndo, visible }) => {
    if (!visible) return null;

    return (
        <div className="undo-toast-overlay">
            <div className="undo-toast">
                <span>{message}</span>
                <button className="btn-undo" onClick={onUndo}>
                    <Undo size={18} />
                    取り消し
                </button>
            </div>
        </div>
    );
};

export default UndoToast;
