export const getGasUrl = () => localStorage.getItem('gas_url') || '';

export const setGasUrl = (url) => {
    localStorage.setItem('gas_url', url);
};

export const logAttendance = async (member, status, leavingTime = null) => {
    const url = getGasUrl();
    if (!url) {
        console.warn("GAS URL not set. Data will not be sent.");
        return false;
    }

    // Payload structure for GAS
    const payload = {
        type: 'attendance',
        memberId: member.id,
        memberName: member.name,
        lineUserId: member.lineUserId || '',
        notificationMethod: member.notificationMethod || 'line',
        email1: member.email1 || '',
        email2: member.email2 || '',
        status, // 'present', 'leaving_early', 'left'
        leavingTime,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });
        return true;
    } catch (error) {
        console.error("Error logging attendance:", error);
        return false;
    }
};
