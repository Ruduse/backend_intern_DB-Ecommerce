import InquiriesTemplate from './inquiries/inquiries.template';
import OtpTemplate from './otp/otp.template';
import VerifyTemplate from './verify/verify.template';
import WelcomeTemplate from './welcome/welcome.template';

const mailerTemplate = {
  templateWelcome: new WelcomeTemplate(),
  templateOTP: new OtpTemplate(),
  templateVerify: new VerifyTemplate(),
  templateInquiries: new InquiriesTemplate(),
};

export default mailerTemplate;
