import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { UserDocument } from '../models/User';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // 1. 이메일로 사용자 조회
    const user = await User.findOne({ email: email.toLowerCase() });

    // 사용자 없음
    if (!user) {
      return done(null, false, {
        message: '등록되지 않은 이메일입니다.'
      });
    }

    // 2. 계정 활성화 확인
    if (!user.isActive) {
      return done(null, false, {
        message: '비활성화된 계정입니다.'
      });
    }

    // 3. 비밀번호 검증
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return done(null, false, {
        message: '비밀번호가 일치하지 않습니다.'
      });
    }

    // 4. 마지막 로그인 시간 업데이트
    user.lastLogin = new Date();
    await user.save();

    // 5. 인증 성공
    return done(null, user);

  } catch (err) {
    // 서버 오류
    return done(err);
  }
}));

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
