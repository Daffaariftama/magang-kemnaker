import React from "react";

interface Filters {
  programStudi: string;
  jabatan: string;
  provinsi: string;
  kota: string;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  loading: boolean;
  fetchProgress: {
    current: number;
    total: number;
    isFetchingAll: boolean;
  };
  availableCities: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  loading,
  fetchProgress,
  availableCities,
}) => {
  const handleProgramStudiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      programStudi: e.target.value,
    });
  };

  const handleJabatanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      jabatan: e.target.value,
    });
  };

  const handleProvinsiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      provinsi: e.target.value,
      kota: "", // Reset kota ketika provinsi berubah
    });
  };

  const handleKotaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      kota: e.target.value,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      programStudi: "",
      jabatan: "",
      provinsi: "11",
      kota: "",
    });
  };

  const hasActiveFilters =
    filters.programStudi ||
    filters.jabatan ||
    filters.kota ||
    filters.provinsi !== "11";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
      {/* Progress Bar untuk Fetching Data */}
      {fetchProgress.isFetchingAll && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Mengambil data lowongan...</span>
            <span>
              {fetchProgress.current} / {fetchProgress.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (fetchProgress.current / fetchProgress.total) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filter Program Studi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Program Studi
          </label>
          <input
            type="text"
            value={filters.programStudi}
            onChange={handleProgramStudiChange}
            placeholder="Cari program studi..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Filter Jabatan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💼 Posisi/Jabatan
          </label>
          <input
            type="text"
            value={filters.jabatan}
            onChange={handleJabatanChange}
            placeholder="Cari posisi..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Filter Provinsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🗺️ Provinsi
          </label>
          <select
            value={filters.provinsi}
            onChange={handleProvinsiChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          >
            {/* UBAH URUTAN: Aceh jadi pertama */}
            <option value="11">Aceh</option>
            <option value="32">Jawa Barat</option>
            <option value="31">DKI Jakarta</option>
            <option value="33">Jawa Tengah</option>
            <option value="35">Jawa Timur</option>
            <option value="36">Banten</option>
            <option value="34">DI Yogyakarta</option>
            <option value="12">Sumatera Utara</option>
            <option value="13">Sumatera Barat</option>
            <option value="14">Riau</option>
            <option value="15">Jambi</option>
            <option value="16">Sumatera Selatan</option>
            <option value="17">Bengkulu</option>
            <option value="18">Lampung</option>
            <option value="19">Kepulauan Bangka Belitung</option>
            <option value="21">Kepulauan Riau</option>
            <option value="51">Bali</option>
            <option value="52">Nusa Tenggara Barat</option>
            <option value="53">Nusa Tenggara Timur</option>
            <option value="61">Kalimantan Barat</option>
            <option value="62">Kalimantan Tengah</option>
            <option value="63">Kalimantan Selatan</option>
            <option value="64">Kalimantan Timur</option>
            <option value="65">Kalimantan Utara</option>
            <option value="71">Sulawesi Utara</option>
            <option value="72">Sulawesi Tengah</option>
            <option value="73">Sulawesi Selatan</option>
            <option value="74">Sulawesi Tenggara</option>
            <option value="75">Gorontalo</option>
            <option value="76">Sulawesi Barat</option>
            <option value="81">Maluku</option>
            <option value="82">Maluku Utara</option>
            <option value="91">Papua</option>
            <option value="92">Papua Barat</option>
            <option value="94">Papua Selatan</option>
            <option value="95">Papua Tengah</option>
            <option value="96">Papua Pegunungan</option>
            <option value="97">Papua Barat Daya</option>
          </select>
        </div>

        {/* Filter Kota - Muncul hanya ketika data sudah loaded */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏙️ Kota/Kabupaten
          </label>
          <select
            value={filters.kota}
            onChange={handleKotaChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading || availableCities.length === 0}
          >
            <option value="">Semua Kota</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {availableCities.length === 0 && !loading && (
            <p className="text-xs text-gray-500 mt-1">
              Pilih provinsi terlebih dahulu
            </p>
          )}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center"
            disabled={loading}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
