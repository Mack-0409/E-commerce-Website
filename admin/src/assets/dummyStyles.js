// src/assets/dummyStyles.js

// Theme configurations
export const themes = {
  grey: {
    bg: "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
    card: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
    border: "border-slate-200 dark:border-slate-600",
    button: "bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700",
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-900 dark:to-blue-900",
    card: "bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
    button: "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800",
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-slate-900 dark:to-purple-900",
    card: "bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
    button: "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800",
  },
};

// Dark theme configurations
export const darkThemes = {
  grey: {
    bg: "dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800",
    card: "dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900",
    border: "dark:border-slate-700",
    button: "dark:bg-gradient-to-r dark:from-slate-600 dark:to-slate-700",
  },
  blue: {
    bg: "dark:bg-gradient-to-r dark:from-slate-900 dark:to-blue-900",
    card: "dark:bg-gradient-to-br dark:from-slate-800 dark:to-blue-900/30",
    border: "dark:border-blue-800",
    button: "dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-800",
  },
  purple: {
    bg: "dark:bg-gradient-to-r dark:from-slate-900 dark:to-purple-900",
    card: "dark:bg-gradient-to-br dark:from-slate-800 dark:to-purple-900/30",
    border: "dark:border-purple-800",
    button: "dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-800",
  },
};

// Text color helpers
export const textColors = {
  light: {
    primary: "text-slate-800",
    secondary: "text-slate-600",
    muted: "text-slate-500",
    inverse: "text-white",
  },
  dark: {
    primary: "dark:text-slate-100",
    secondary: "dark:text-slate-300",
    muted: "dark:text-slate-400",
    inverse: "dark:text-slate-900",
  },
};

// Background colors for dark mode
export const bgColors = {
  light: {
    main: "bg-slate-50",
    card: "bg-white",
    input: "bg-white",
  },
  dark: {
    main: "dark:bg-slate-900",
    card: "dark:bg-slate-800",
    input: "dark:bg-slate-700",
  },
};

// Theme button colors
export const themeButtonColors = {
  grey: "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-600 dark:to-slate-700",
  blue: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50",
  purple: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50",
};

// Common classes
export const classes = {
  // Layout
  pageContainer: "min-h-screen py-12 pt-30 px-4",
  maxWidthContainer: "max-w-5xl mx-auto",
  gridContainer: "grid grid-cols-1 md:grid-cols-2 gap-8",
  
  // Header
  headerContainer: "flex items-center justify-between mb-8",
  headerTitle: "text-2xl font-bold font-[pacifico] text-slate-800 dark:text-slate-100",
  themeButtonsContainer: "flex gap-2",
  themeButton: (isActive) => 
    `w-8 h-8 rounded-full border-2 ${isActive ? "ring-2 ring-slate-300" : ""}`,
  
  // Form
  formContainer: (theme) => 
    `rounded-2xl border ${theme.border} shadow-lg p-6 flex flex-col gap-5 ${theme.card}`,
  
  // Form labels
  formLabel: "mb-3 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2",
  formLabelSimple: "mb-2 text-sm font-medium text-slate-700 dark:text-slate-300",
  requiredStar: "text-rose-500",
  
  // Image upload
  imagePreviewContainer: (theme) => 
    `w-32 h-32 rounded-xl border ${theme.border} flex items-center justify-center overflow-hidden shadow-sm`,
  imagePreviewEmpty: "bg-slate-50 dark:bg-slate-700",
  imagePlaceholder: "flex flex-col items-center gap-2 text-slate-400",
  
  // Buttons
  uploadButton: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 transition shadow-sm",
  removeButton: "inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-600 transition shadow-sm",
  
  // Helper text
  helperText: "mt-3 text-xs text-slate-500 dark:text-slate-400",
  
  // Input fields
  input: (theme) => 
    `w-full rounded-xl border ${theme.border} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400`,
  textarea: (theme) => 
    `w-full rounded-xl border ${theme.border} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm resize-none dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400`,
  priceInputContainer: "relative",
  priceIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400",
  priceInput: (theme) => 
    `w-full rounded-xl border ${theme.border} pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400`,
  
  // Submit button
  submitButton: (theme, loading) => 
    `w-full inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-white font-semibold transition shadow-lg ${
      theme.button
    } ${
      loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
    }`,
  
  // Preview section
  previewContainer: (theme) => 
    `rounded-2xl border ${theme.border} shadow-lg p-5 ${theme.card}`,
  previewHeader: "flex items-center justify-between mb-4",
  previewTitle: "text-md font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2",
  previewCard: (theme) => 
    `rounded-xl border ${theme.border} overflow-hidden shadow-md bg-white dark:bg-slate-800`,
  previewImageContainer: "relative h-64 overflow-hidden",
  previewNewBadge: "absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs",
  previewPlaceholder: "w-full h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 text-slate-400",
  previewContent: "p-5",
  previewName: "text-xl font-bold text-slate-800 dark:text-slate-100",
  previewCategory: "mt-2 text-sm text-slate-600 dark:text-slate-400",
  previewDescription: "mt-3 text-sm text-slate-600 dark:text-slate-400 min-h-[60px]",
  previewPriceContainer: "mt-5 flex items-center justify-between",
  previewPriceLabel: "text-sm text-slate-500 dark:text-slate-400",
  previewPriceValue: "text-xl font-bold text-slate-800 dark:text-slate-100",
};

// Helper functions
export const getInputClass = (theme) => 
  `w-full rounded-xl border ${theme.border} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400`;


// src/assets/dummyStyles.js
export const listPageStyles = {
  root: "min-h-screen pt-30 bg-gray-50 dark:bg-slate-900 p-6 font-sans text-gray-800 dark:text-gray-100",
  container: "max-w-6xl mx-auto",
  header: "mb-6 flex items-center justify-between",
  title: "text-3xl font-[pacifico] font-extrabold tracking-tight",
  grid: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  
  article: "bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200",
  imageContainer: "relative h-44 rounded-xl overflow-hidden flex items-center justify-center",
  image: "object-contain w-full h-full",
  fallbackImageContainer: "flex items-center justify-center w-full h-full bg-gray-50 dark:bg-slate-700 text-gray-400",
  
  name: "text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100 font-[pacifico]",
  description: "text-sm text-gray-500 dark:text-gray-400",
  categoryTag: "px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
  price: "text-lg font-bold",
  deleteButton: "cursor-pointer inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700",
  
  noItems: "text-center text-gray-500 dark:text-gray-400 mt-8"
};

// src/assets/dummyStyles.js

const dummyStyles = {
  // Layout
  mainContainer: "min-h-screen pt-30 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-[pacifico] py-8 px-4",
  innerContainer: "max-w-6xl mx-auto",
  
  // Header
  headerContainer: "mb-8 flex items-center gap-4",
  headerIconContainer: "w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm",
  headerIcon: "w-6 h-6 text-slate-700 dark:text-slate-300",
  headerTitle: "text-2xl font-bold text-slate-800 dark:text-slate-100",
  headerSubtitle: "text-sm text-slate-600 dark:text-slate-400 mt-1",
  
  // Filter Section
  filterSection: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600 p-5 mb-6",
  filterTitle: "text-lg font-semibold text-slate-800 dark:text-slate-100",
  searchContainer: "relative flex-1",
  searchIcon: "w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2",
  searchInput: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm dark:bg-slate-700 dark:text-slate-100",
  selectContainer: "relative",
  select: "appearance-none bg-white dark:bg-slate-700 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm dark:text-slate-100",
  selectIcon: "w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
  
  // Booking Cards
  emptyStateContainer: "text-center py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600",
  emptyStateIcon: "w-12 h-12 mx-auto text-slate-400 mb-3",
  emptyStateText: "text-slate-500 dark:text-slate-400",
  
  // Booking Card
  bookingCard: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600 overflow-hidden",
  bookingHeader: "p-5 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between",
  customerIconContainer: "w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700",
  customerIcon: "w-5 h-5 text-slate-600 dark:text-slate-400",
  customerName: "font-semibold text-slate-800 dark:text-slate-100",
  customerInfo: "text-sm text-slate-600 dark:text-slate-400",
  infoSeparator: "mx-2 text-slate-300 dark:text-slate-500",
  orderId: "text-slate-500 dark:text-slate-400",
  orderIdValue: "font-medium text-slate-800 dark:text-slate-100",
  
  // Status Badges
  statusBadgeBase: "px-3 py-1 rounded-full text-xs font-medium",
  paymentBadgeBase: "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
  paymentIcon: "w-3 h-3",
  
  // Status Colors
  statusColors: {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    default: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
  },
  
  // Payment Status Colors
  paymentColors: {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    unpaid: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    refund: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    default: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
  },
  
  // Action Buttons
  statusSelect: (isCancelled) => 
    `text-sm rounded-lg py-1 px-2 border ${isCancelled ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-70 dark:bg-slate-700 dark:border-slate-600" : "bg-slate-100 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"}`,
  deleteButton: "p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50",
  deleteIcon: "w-4 h-4",
  viewDetailsButton: "px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 text-sm font-medium",
  
  // Expanded Details
  detailsGrid: "p-5 grid grid-cols-1 lg:grid-cols-2 gap-6",
  sectionTitle: "text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2",
  sectionIcon: "w-4 h-4",
  
  // Info Row
  infoRow: "flex items-center gap-3 mb-3",
  infoIconContainer: "w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700",
  infoLabel: "text-sm text-slate-600 dark:text-slate-400",
  infoValue: "text-sm text-slate-800 dark:text-slate-100 font-medium",
  
  // Watch Details
  watchContainer: "space-y-6",
  watchItem: "flex flex-col sm:flex-row gap-4 p-4 rounded-xl",
  watchImageContainer: "w-full sm:w-1/3",
  watchImageWrapper: "rounded-xl overflow-hidden shadow-sm",
  watchImage: "w-full h-40 object-contain",
  watchImageFallback: "w-full h-40 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400",
  watchDetails: "w-full sm:w-2/3",
  watchName: "text-lg font-semibold text-slate-800 dark:text-slate-100",
  watchInfo: "mt-3 space-y-1 text-sm",
  watchLabel: "font-medium text-slate-600 dark:text-slate-400",
  
  // Pricing
  priceContainer: "mt-4 text-sm",
  priceItem: "font-medium text-slate-600 dark:text-slate-400",
  priceTotal: "mt-2 text-lg font-bold",
  
  // Loading & Error
  loadingText: "text-center py-6 dark:text-slate-400",
  errorText: "text-center text-red-600 py-3 dark:text-red-400"
};

export default dummyStyles;





export const navbarStyles = {
  // Layout
  header: "w-full fixed top-4 left-0 z-50 px-4",
  container: "max-w-6xl mx-auto",
  
  // Main bar
  mainBar: "relative bg-gradient-to-r from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-slate-300/60 dark:border-slate-600/60 rounded-2xl shadow-sm px-4 py-3 flex items-center",
  
  // Brand section
  brandContainer: "flex items-center gap-3 mr-4",
  brandLogo: "w-11 h-11 rounded-xl bg-white/60 dark:bg-slate-700/60 flex items-center justify-center ring-1 ring-slate-200 dark:ring-slate-600 shadow-sm",
  brandIcon: "w-5 h-5 text-slate-700 dark:text-slate-300",
  brandText: "text-lg font-semibold text-slate-800 dark:text-slate-100",
  
  // Navigation
  navContainer: "hidden md:flex flex-1 justify-center",
  navItemsContainer: "flex items-center gap-3",
  
  // Nav items (for NavLink)
  navItemBase: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
  navItemInactive: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
  navItemActive: "bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow",
  navItemIcon: "w-4 h-4 text-slate-600 dark:text-slate-400",
  
  // Right section
  rightContainer: "ml-auto flex items-center gap-3",
  
  // Mobile menu
  mobileMenuButton: "md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition",
  mobileMenuIcon: "w-6 h-6 text-slate-700 dark:text-slate-300",
  
  // Mobile dropdown
  mobileDropdown: "mt-3 md:hidden bg-gradient-to-r from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-slate-300/60 dark:border-slate-600/60 rounded-2xl shadow-sm p-4",
  mobileNavItemsContainer: "flex flex-col items-center gap-3"
};


// Add to src/assets/dummyStyles.js

export const bookingStyles = {
  // Layout
  root: "min-h-screen pt-30 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-[pacifico] py-8 px-4 overflow-x-hidden",
  container: "max-w-6xl mx-auto",
  
  // Header
  headerContainer: "mb-8 flex items-center gap-4",
  headerIcon: "w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm",
  headerIconInner: "w-6 h-6 text-slate-700 dark:text-slate-300",
  headerTitle: "text-2xl font-bold text-slate-800 dark:text-slate-100",
  headerSubtitle: "text-sm text-slate-600 dark:text-slate-400 mt-1",
  
  // Stats/Info Card
  infoCard: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600 p-5 mb-6",
  infoCardTitle: "text-lg font-semibold text-slate-800 dark:text-slate-100",
  filterContainer: "flex flex-col md:flex-row md:items-center justify-between gap-4",
  searchContainer: "relative flex-1 min-w-0",
  searchIcon: "w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2",
  searchInput: "w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm dark:bg-slate-700 dark:text-slate-100",
  filterSelectContainer: "relative",
  filterSelect: "appearance-none bg-white dark:bg-slate-700 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm dark:text-slate-100",
  filterSelectIcon: "w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
  
  // Booking Cards
  bookingsContainer: "space-y-5",
  noBookingsContainer: "text-center py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600",
  noBookingsIcon: "w-12 h-12 mx-auto text-slate-400 mb-3",
  noBookingsText: "text-slate-500 dark:text-slate-400",
  
  // Individual Booking Card
  bookingCard: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md border border-slate-200 dark:border-slate-600 overflow-hidden",
  bookingHeader: "p-5 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between",
  customerContainer: "flex items-center gap-3 min-w-0",
  customerAvatar: "w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700",
  customerIcon: "w-5 h-5 text-slate-600 dark:text-slate-400",
  customerName: "font-semibold text-slate-800 dark:text-slate-100 break-words",
  customerInfo: "text-sm text-slate-600 dark:text-slate-400 break-words",
  customerSeparator: "mx-2 text-slate-300 dark:text-slate-500",
  orderId: "text-slate-500 dark:text-slate-400",
  orderIdValue: "font-medium text-slate-800 dark:text-slate-100 break-words",
  
  // Actions Section
  actionsContainer: "flex items-center gap-3 flex-wrap",
  actionButtonGroup: "flex items-center gap-2 flex-wrap",
  
  // Status Dropdown
  statusSelect: "text-sm rounded-lg py-1 px-2 border",
  statusSelectDisabled: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 cursor-not-allowed opacity-70",
  statusSelectEnabled: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
  
  // Buttons
  deleteButton: "p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50",
  deleteIcon: "w-4 h-4",
  toggleButton: "px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 text-sm font-medium",
  
  // Expanded Details
  expandedContainer: "p-5 grid grid-cols-1 lg:grid-cols-2 gap-6",
  sectionTitle: "text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2",
  sectionIcon: "w-4 h-4",
  
  // Info Row Component
  infoRowContainer: "flex items-center gap-3 mb-3",
  infoRowIcon: "w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700",
  infoRowLabel: "text-slate-600 dark:text-slate-400",
  infoRowValue: "text-slate-800 dark:text-slate-100 font-medium break-words",
  
  // Payment Badge
  paymentBadgeContainer: "flex items-center gap-3",
  paymentBadgeIconContainer: "w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700",
  paymentBadgeIcon: "w-4 h-4",
  paymentBadgeLabel: "text-slate-600 dark:text-slate-400",
  
  // Watch Details
  watchContainer: "space-y-6",
  watchItem: "flex flex-col sm:flex-row gap-4 p-4 rounded-xl",
  watchImageContainer: "w-full sm:w-1/3",
  watchImageWrapper: "rounded-xl overflow-hidden shadow-sm",
  watchImage: "w-full max-w-full h-auto object-contain",
  watchNoImage: "w-full h-40 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400",
  watchDetails: "w-full sm:w-2/3 min-w-0",
  watchTitle: "text-lg font-semibold text-slate-800 dark:text-slate-100 break-words",
  watchInfoContainer: "mt-3 space-y-1 text-sm",
  watchInfoLabel: "font-medium text-slate-600 dark:text-slate-400",
  
  // Price Summary
  priceSummary: "mt-4 text-sm",
  priceRow: "font-medium text-slate-600 dark:text-slate-400",
  finalPrice: "mt-2 text-lg font-bold",
  
  // Status
  loadingText: "text-center py-6 dark:text-slate-400",
  errorText: "text-center text-red-600 py-3 dark:text-red-400"
};

// Status badge styles (dynamic classes)
export const statusBadgeStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-rose-100 text-rose-800",
  default: "bg-slate-100 text-slate-800"
};

// Payment badge styles (dynamic classes)
export const paymentBadgeStyles = {
  Paid: "bg-green-100 text-green-800",
  Unpaid: "bg-rose-100 text-rose-800",
  Refund: "bg-amber-100 text-amber-800",
  default: "bg-slate-100 text-slate-800"
};

// Badge base styles
export const badgeBaseStyles = "px-3 py-1 rounded-full text-xs font-medium";
export const paymentBadgeBaseStyles = "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium";