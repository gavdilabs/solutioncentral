namespace com.gavdilabs.techtransmgt.types;

define type ActiveUser {
  username  : String;
  firstName : String;
  lastName  : String;
  email     : String;
  roles     : UserRoles;
}

define type UserRoles {
  isAdmin      : Boolean;
  isView       : Boolean;
  isMaintainer : Boolean;
  isReviewer   : Boolean;
  isApprover   : Boolean;
  isDeveloper  : Boolean;
}
