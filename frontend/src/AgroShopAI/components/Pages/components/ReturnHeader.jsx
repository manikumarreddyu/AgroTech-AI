function ReturnHeader() {
  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">AgroShop Returns</h1>
        <nav>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            My Account
          </button>
        </nav>
      </div>
    </header>
  );
}

export default ReturnHeader;
