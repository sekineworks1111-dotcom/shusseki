import { useState } from 'react';
import MemberGrid from '../components/MemberGrid';
import AttendanceModal from '../components/AttendanceModal';
import UndoToast from '../components/UndoToast';
import { logAttendance } from '../services/GasApi';

const AttendancePage = ({ members, setMembers }) => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Undo state: stores the ID of the last processed member and their PREVIOUS state
    const [undoState, setUndoState] = useState(null);
    const [undoTimeoutId, setUndoTimeoutId] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const handleModalClose = () => {
        setSelectedMember(null);
    };

    const handleAttendanceConfirm = (memberId, status, leavingTime = null) => {
        // 1. Find the member to get current state (for undo)
        const member = members.find(m => m.id === memberId);
        if (!member) return;

        // 2. Clear any existing undo timer/state (auto-dismiss previous undo)
        if (undoTimeoutId) {
            clearTimeout(undoTimeoutId);
        }

        // 3. Set up new undo state
        setUndoState({
            memberId,
            previousMemberState: { ...member }
        });

        // 4. Start 5 second timer to clear undo availability
        const timerId = setTimeout(() => {
            setUndoState(null);
            setUndoTimeoutId(null);
        }, 5001);
        setUndoTimeoutId(timerId);

        // 5. Update local state
        setMembers(prev => prev.map(m =>
            m.id === memberId
                ? { ...m, status, leavingTime }
                : m
        ));

        // 6. Submit to backend
        logAttendance(memberId, member.name, status, leavingTime);

        // 7. Close modal
        setSelectedMember(null);
    };

    const handleUndo = () => {
        if (!undoState) return;

        // 1. Clear timer
        if (undoTimeoutId) {
            clearTimeout(undoTimeoutId);
            setUndoTimeoutId(null);
        }

        // 2. Revert state
        setMembers(prev => prev.map(m =>
            m.id === undoState.memberId
                ? undoState.previousMemberState
                : m
        ));

        // 3. Notify backend of Reversion
        const prev = undoState.previousMemberState;
        logAttendance(prev.id, prev.name, prev.status, prev.leavingTime);

        // 4. Clear undo state
        setUndoState(null);
    };

    return (
        <div className="attendance-page">
            <header>
                <h1>羽村さくらバレーボールクラブ</h1>
                <p>練習出欠確認</p>
            </header>

            <main>
                <MemberGrid
                    members={members}
                    onMemberClick={handleMemberClick}
                />
            </main>

            <AttendanceModal
                member={selectedMember}
                onClose={handleModalClose}
                onConfirm={handleAttendanceConfirm}
            />

            <UndoToast
                visible={!!undoState}
                message="登録しました"
                onUndo={handleUndo}
            />
        </div>
    );
};

export default AttendancePage;
