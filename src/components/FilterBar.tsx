import { useState, useEffect } from "react";
import Select from 'react-select';

interface FilterBarProps {
  filters: {
    programStudi: string;
    jabatan: string;
    provinsi: string;
  };
  onFilterChange: (filters: any) => void;
  loading: boolean;
  fetchProgress: {
    current: number;
    total: number;
    isFetchingAll: boolean;
  };
}

interface ProvinceOption {
  value: string;
  label: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  fetchProgress,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const provinces: ProvinceOption[] = [
    { value: "11", label: "ACEH" },
    { value: "12", label: "SUMATERA UTARA" },
    { value: "13", label: "SUMATERA BARAT" },
    { value: "14", label: "RIAU" },
    { value: "15", label: "JAMBI" },
    { value: "16", label: "SUMATERA SELATAN" },
    { value: "17", label: "BENGKULU" },
    { value: "18", label: "LAMPUNG" },
    { value: "19", label: "KEPULAUAN BANGKA BELITUNG" },
    { value: "21", label: "KEPULAUAN RIAU" },
    { value: "31", label: "DKI JAKARTA" },
    { value: "32", label: "JAWA BARAT" },
    { value: "33", label: "JAWA TENGAH" },
    { value: "34", label: "DI YOGYAKARTA" },
    { value: "35", label: "JAWA TIMUR" },
    { value: "36", label: "BANTEN" },
    { value: "51", label: "BALI" },
    { value: "52", label: "NUSA TENGGARA BARAT" },
    { value: "53", label: "NUSA TENGGARA TIMUR" },
    { value: "61", label: "KALIMANTAN BARAT" },
    { value: "62", label: "KALIMANTAN TENGAH" },
    { value: "63", label: "KALIMANTAN SELATAN" },
    { value: "64", label: "KALIMANTAN TIMUR" },
    { value: "65", label: "KALIMANTAN UTARA" },
    { value: "71", label: "SULAWESI UTARA" },
    { value: "72", label: "SULAWESI TENGAH" },
    { value: "73", label: "SULAWESI SELATAN" },
    { value: "74", label: "SULAWESI TENGGARA" },
    { value: "75", label: "GORONTALO" },
    { value: "76", label: "SULAWESI BARAT" },
    { value: "81", label: "MALUKU" },
    { value: "82", label: "MALUKU UTARA" },
    { value: "91", label: "PAPUA" },
    { value: "92", label: "PAPUA BARAT" },
    { value: "93", label: "PAPUA SELATAN" },
    { value: "94", label: "PAPUA TENGAH" },
    { value: "95", label: "PAPUA PEGUNUNGAN" },
  ];

  // Find current province option
  const getCurrentProvince = (): ProvinceOption | null => {
    return provinces.find(province => province.value === localFilters.provinsi) || null;
  };

  const handleProgramStudiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...localFilters, programStudi: e.target.value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleJabatanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...localFilters, jabatan: e.target.value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProvinsiChange = (selectedOption: ProvinceOption | null) => {
    const newFilters = { 
      ...localFilters, 
      provinsi: selectedOption ? selectedOption.value : "" 
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { programStudi: "", jabatan: "", provinsi: "32" };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const clearProgramStudi = () => {
    const newFilters = { ...localFilters, programStudi: "" };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearJabatan = () => {
    const newFilters = { ...localFilters, jabatan: "" };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Effect untuk sync localFilters dengan props filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Custom styles for react-select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      padding: '2px 4px',
      border: '1px solid #D1D5DB',
      borderRadius: '12px',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '&:hover': {
        borderColor: '#D1D5DB'
      },
      backgroundColor: fetchProgress.isFetchingAll ? '#F3F4F6' : '#FFFFFF',
      cursor: fetchProgress.isFetchingAll ? 'not-allowed' : 'default'
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      zIndex: 50
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
      borderRadius: '12px'
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#4F46E5' 
        : state.isFocused 
        ? '#F3F4F6' 
        : '#FFFFFF',
      color: state.isSelected ? '#FFFFFF' : '#374151',
      padding: '12px 16px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: state.isSelected ? '#4F46E5' : '#E5E7EB'
      }
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#9CA3AF'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#374151'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      color: '#6B7280',
      padding: '4px',
      transition: 'transform 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)'
    }),
    clearIndicator: (base: any) => ({
      ...base,
      color: '#6B7280',
      padding: '4px',
      cursor: 'pointer',
      '&:hover': {
        color: '#374151'
      }
    })
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-primary-900 to-purple-900 rounded-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Filter Lowongan</h3>
            <p className="text-sm text-gray-500 mt-1">
              Temukan magang yang sesuai dengan kriteria Anda
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={fetchProgress.isFetchingAll}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gray-300 w-full sm:w-auto"
        >
          <svg
            className="w-4 h-4"
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
          <span>Reset Filter</span>
        </button>
      </div>

      {/* Progress Bar */}
      {fetchProgress.isFetchingAll && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-900">
                Mengambil data lowongan...
              </span>
            </div>
            <span className="text-sm text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-full">
              {fetchProgress.current} / {fetchProgress.total} halaman
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{
                width: `${
                  (fetchProgress.current / fetchProgress.total) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Program Studi */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14v6l9-5-9-5-9 5 9 5z"
              />
            </svg>
            <span>Program Studi</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={localFilters.programStudi}
              onChange={handleProgramStudiChange}
              placeholder="isi program studi..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
              disabled={fetchProgress.isFetchingAll}
            />
            {localFilters.programStudi && (
              <button
                onClick={clearProgramStudi}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Posisi / Jabatan */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
            <span>Posisi / Jabatan</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={localFilters.jabatan}
              onChange={handleJabatanChange}
              placeholder="Cari posisi..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
              disabled={fetchProgress.isFetchingAll}
            />
            {localFilters.jabatan && (
              <button
                onClick={clearJabatan}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Provinsi */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Provinsi</span>
          </label>
          <Select
            value={getCurrentProvince()}
            onChange={handleProvinsiChange}
            options={provinces}
            placeholder="Cari provinsi..."
            isDisabled={fetchProgress.isFetchingAll}
            isSearchable
            noOptionsMessage={() => "Tidak ada provinsi yang sesuai"}
            styles={customStyles}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;