import UserModel, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return UserModel.findOne({ _id: objectId }).exec();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async comparePassword(user: IUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}


export default new UserService();
