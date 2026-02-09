import MemberCard from './MemberCard';

const MemberGrid = ({ members, onMemberClick }) => {
    return (
        <div className="member-grid">
            {members.map(member => (
                <MemberCard
                    key={member.id}
                    member={member}
                    onClick={onMemberClick}
                />
            ))}
        </div>
    );
};

export default MemberGrid;
