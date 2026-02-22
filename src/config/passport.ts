import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { UserDocument } from '../models/User';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email, isActive: true });

      if (!user) {
        return done(null, false, { message: '이메일 또는 비밀번호가 잘못되었습니다.' });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return done(null, false, { message: '이메일 또는 비밀번호가 잘못되었습니다.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
