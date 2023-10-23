import React from 'react';

function NoteSearch(props) {
  const { search, onSearchChange } = props;

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div>
      <form>
        <div className="note__search">
          <input
            className="input-area"
            type="text"
            placeholder="Search"
            value={search} // Menampilkan nilai pencarian saat ini
            onChange={handleSearchChange} // Memanggil fungsi ketika pencarian berubah
          />
        </div>
      </form>
    </div>
  );
}

export default NoteSearch;
