export class UserDto {
    constructor(id, role) {
      this.id = id;
      this.role = role;
    }
  
    static fromPayload(payload) {
      return new UserDto(payload.sub, payload.role);
    }
  }