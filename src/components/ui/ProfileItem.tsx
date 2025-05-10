const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className="text-base font-medium text-slate-800 dark:text-slate-100">{value}</p>
  </div>
);
export default ProfileItem;
