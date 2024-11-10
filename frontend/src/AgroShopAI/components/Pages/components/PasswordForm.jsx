const PasswordForm = ({
  password,
  setPassword,
  isLoading,
  setIsLoading,
  setMessage,
}) => {
  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPassword({ current: "", new: "", confirm: "" });
    }, 1500);
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="current"
          className="block text-sm font-medium text-gray-700"
        >
          Current Password
        </label>
        <input
          type="password"
          id="current"
          name="current"
          value={password.current}
          onChange={handlePasswordChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label
          htmlFor="new"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type="password"
          id="new"
          name="new"
          value={password.new}
          onChange={handlePasswordChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          minLength={8}
        />
      </div>
      <div>
        <label
          htmlFor="confirm"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          value={password.confirm}
          onChange={handlePasswordChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
