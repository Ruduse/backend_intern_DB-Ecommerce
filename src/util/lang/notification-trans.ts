export const NotificationTrans = {
  purchaseClovers: {
    title: {
      vi: 'Bạn đã mua cỏ ba lá thành công',
      en: 'You have successfully purchased clover',
      ko: '성공적으로 클로버를 구매하였습니다',
      ja: 'クローバーの購入が成功しました',
    },
    description: (numberClovers: number) => ({
      vi: `Tài khoản của bạn đã được cộng thêm +${numberClovers} cỏ ba lá.`,
      en: `Your account is credited with +${numberClovers} clover.`,
      ko: `귀하의 계정에 +${numberClovers} 클로버가 추가되었습니다.`,
      ja: `あなたのアカウントに +${numberClovers} クローバーが加算されました。`,
    }),
  },

  upgradePremium: {
    title: {
      vi: 'Tài khoản Premium',
      en: 'Premium account',
      ko: '프리미엄 계정',
      ja: 'プレミアムアカウント',
    },
    description: {
      vi: 'Chúc mừng, bạn đã nâng cấp thành công lên tài khoản Premium.',
      en: 'Congratulations, you have successfully upgraded to a premium account',
      ko: '축하합니다! 프리미엄 계정으로 성공적으로 업그레이드되었습니다.',
      ja: 'おめでとうございます！プレミアムアカウントにアップグレードされました。',
    },
  },

  giftClovers: {
    title: {
      vi: 'Yeah! Quà đã được tặng cho bạn',
      en: 'Yeah! Gift given to you',
      ko: 'Yeah! 선물이 당신에게 주어졌어요',
      ja: 'Yeah! プレゼントがあなたに贈られました',
    },
    description: (numberClovers: number) => ({
      vi: `Bạn nhận được +${numberClovers} cỏ ba lá`,
      en: `You receive a gift of +${numberClovers} clovers`,
      ko: `당신은 +${numberClovers} 개의 클로버를 받았습니다`,
      ja: `+${numberClovers} のクローバーを受け取りました`,
    }),
  },
};
