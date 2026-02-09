export const mockMembers = Array.from({ length: 30 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: `Member ${i + 1}`,
  ruby: `めんばー ${i + 1}`, // Hiragana for reading
  photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`, // Using DiceBear for avatars
  status: 'pending', // 'pending', 'present', 'leaving_early', 'left'
  leavingTime: null,
  lineUserId: '', // New field for LINE ID
  notifyEntry: true, // Default to true
  notifyExit: true, // Default to true
  remarks: '', // For any other notes
}));
