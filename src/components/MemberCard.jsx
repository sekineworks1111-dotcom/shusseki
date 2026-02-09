import { useState } from 'react';
import { User, Check, Clock, X } from 'lucide-react';
import VolleyballIcon from './VolleyballIcon';

const MemberCard = ({ member, onClick }) => {
    const getStatusIcon = () => {
        switch (member.status) {
            case 'present':
                return <VolleyballIcon size={40} color="white" strokeWidth={2} />;
            case 'leaving_early':
                return <Clock size={40} color="white" strokeWidth={3} />;
            case 'left':
                return <User size={40} color="white" strokeWidth={3} />;
            default:
                return null;
        }
    };

    const getStatusClass = () => {
        switch (member.status) {
            case 'present':
                return 'status-present';
            case 'leaving_early':
                return 'status-early';
            case 'left':
                return 'status-left';
            default:
                return '';
        }
    };

    return (
        <button
            className={`member-card ${getStatusClass()}`}
            onClick={() => onClick(member)}
            aria-label={`${member.name}の出欠登録`}
        >
            <div className="img-wrapper">
                <img src={member.photoUrl} alt={member.name} loading="lazy" />
                {member.status !== 'pending' && (
                    <div className="status-overlay">
                        {getStatusIcon()}
                    </div>
                )}
            </div>
            <div className="member-info">
                <span className="member-ruby">{member.ruby}</span>
                <span className="member-name">{member.name}</span>
            </div>
        </button>
    );
};

export default MemberCard;
