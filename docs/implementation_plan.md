# Email Notification Implementation Plan

## Goal
Enable email notifications for attendance (in addition to LINE). Allow admins to configure notification methods (LINE, Email, Both) and email addresses per member.
Also, allow admins to ADD and DELETE members from the list.

## User Review Required
> [!IMPORTANT]
> **GAS Deployment Required**: This update involves changing the data sent to Google Apps Script. You will need to update your GAS script to handle the new `email` and `notificationMethod` fields. I will provide a sample `.gs` file.

## Proposed Changes

### Data Layer
#### [MODIFY] [mockMembers.js](file:///c:/Users/freem/kaihatsuyou/shusseki/src/data/mockMembers.js)
- Add defaults for `notificationMethod` ('line'), `email1` (''), `email2` ('').

### UI Components
#### [MODIFY] [AdminDashboard.jsx](file:///c:/Users/freem/kaihatsuyou/shusseki/src/pages/AdminDashboard.jsx)
- **Settings Section**: No changes needed here, as it's member-specific.
- **Member List/Grid**:
    - Add UI to select `notificationMethod` (Select/Radio).
    - Add inputs for `email1` and `email2`.
    - Handle validation (simple format check).
- **Member Management**:
    - Add "Add Member" button (top of list).
    - Create a new member object with default values and unique ID.
    - Add "Delete" button (trash icon) for each member with confirmation.

#### [MODIFY] [AttendancePage.jsx](file:///c:/Users/freem/kaihatsuyou/shusseki/src/pages/AttendancePage.jsx)
- Update `handleAttendanceConfirm` to pass the full `member` object (or specific notification fields) to `logAttendance`.

### Services
#### [MODIFY] [GasApi.js](file:///c:/Users/freem/kaihatsuyou/shusseki/src/services/GasApi.js)
- Update `logAttendance` signature to accept full `member` details.
- Update payload to include:
    - `lineUserId`
    - `notificationMethod`
    - `email1`
    - `email2`

### Backend (Reference)
#### [NEW] [gas_script_reference.gs](file:///c:/Users/freem/kaihatsuyou/shusseki/gas_script_reference.gs)
- Create a reference file for the user containing the necessary Google Apps Script code to handle email sending.

## Verification Plan

### Automated Tests
- None available for this project.

### Manual Verification
1.  **Admin Dashboard**:
    - Open Admin Dashboard.
    - Set a member to "Email Only".
    - Enter an email address.
    - Save/Update (check if state persists in memory).
2.  **Payload Check**:
    - Go to Attendance Page.
    - Click "Enter" (出席) for that member.
    - Check Browser Console (or `GasApi.js` logs) to confirm the POST payload contains `notificationMethod: 'email'` and the email address.
