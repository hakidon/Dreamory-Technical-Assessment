import UserModel, { IUser } from '../models/User';

class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find().exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    const newUser = new UserModel(user);
    console.log('asdsad')
    console.log(newUser)
    return newUser.save();
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }
}



export default new UserService();
