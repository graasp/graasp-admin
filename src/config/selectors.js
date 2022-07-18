export const buildChildrenItemsTableId = (id) => `itemsChildrenTable${id}`;
export const buildMembersTableId = (id) => `membersTable-item-${id}`;
export const buildMembersTableTitle = (title) => `membersTable-title-${title}`;
export const buildItemsTableTitle = (title) => `itemsTable-title-${title}`;
export const buildPermissionsTableTitle = (title) =>
  `permissionsTable-title-${title}`;

export const buildScrollableTabId = (id) => `scrollable-prevent-tab-${id}`;
export const buildTableTitle = (tableType, tableName) =>
  `${tableType}Table-title-${tableName}`;
export const buildTableRowId = (tableType, tableName, id) =>
  `${tableType}TableRow-${tableName}-${id}`;
export const buildTableId = (tableType, tableName) =>
  `${tableType}Table-${tableName}-id`;
export const buildTableCheckBox = (tableType) => `${tableType}TableRowCheckbox`;

export const buildItemsTableRowId = (id) => `itemsTableRow-${id}`;
export const buildPermissionsTableRowId = (id) => `permissionsTableRow-${id}`;
export const buildMembersTableRowId = (id) => `membersTableRow-${id}`;
export const buildNavigationLink = (id) => `navigationLink-${id}`;
export const buildCollectionsTableRowId = (id) => `collectionsTableRow-${id}`;
export const MEMBERS_TABLE_EMPTY_ROW_ID = 'membersTableEmptyRow';
export const ITEMS_TABLE_EMPTY_ROW_ID = 'itemsTableEmptyRow';
export const CONFIRM_DELETE_BUTTON_ID = 'confirmDeleteButton';
export const HEADER_APP_BAR_ID = 'headerAppBar';
export const HEADER_USER_ID = 'headerUser';
export const CREATE_ITEM_BUTTON_ID = 'createItemButton';
