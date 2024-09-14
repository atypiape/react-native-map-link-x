import {NativeModules, Platform} from 'react-native';

interface RNMapLinkModule {
  isApkInstalled(packageName: string): Promise<boolean>;
}

interface Settings {
  AppleLocale?: string;
  AppleLanguages?: string[];
}

interface SettingsManagerModule {
  settings?: Settings;
}

interface I18nManagerModule {
  localeIdentifier?: string;
}

interface SelectLanguage<T> {
  chineseSimplified: T;
  chineseTraditional: T;
  default: T;
}

const iIOS = Platform.OS === 'ios';

/*******************************************************************************
 * 检查某个应用是否已安装
 * @param {string} packageName 应用的包名，例如智管工为 com.zhiguangong.mobile
 * @returns {Promise<boolean>} 已安装返回 true，否则返回 false
 ******************************************************************************/
export async function isApkInstalled(packageName: string): Promise<boolean> {
  if (iIOS) {
    return false;
  }
  const RNMapLink = NativeModules.RNMapLink as RNMapLinkModule;
  if (!RNMapLink) {
    console.warn('[RNMapLink] module undefined');
    return false;
  }
  if (!RNMapLink.isApkInstalled) {
    console.warn('[RNMapLink] "isApkInstalled" undefined');
    return false;
  }
  return RNMapLink.isApkInstalled(packageName);
}

/*******************************************************************************
 * 获取设备当前语言
 * @returns {string} 美国英语 en_US、简体中文 zh_CN 等
 ******************************************************************************/
export function getLanguage(): string {
  let lang = '';
  if (iIOS) {
    const SettingsManager = NativeModules.SettingsManager as
      | SettingsManagerModule
      | undefined;
    // `AppleLanguages` 只在 iOS 13.0 之前有效
    const {AppleLocale, AppleLanguages} = SettingsManager?.settings || {};
    lang = AppleLocale || AppleLanguages?.[0] || '';
  }
  // Android
  else {
    const I18nManager = NativeModules.I18nManager as
      | I18nManagerModule
      | undefined;
    lang = I18nManager?.localeIdentifier || '';
  }
  // `zh_CN_#Hans` 去掉后面的 `_#Hans`
  return lang.replace(/_#\w+/, '');
}

/*******************************************************************************
 * 判断是否为中文环境
 ******************************************************************************/
export function selectLanguage<T>(specifics: SelectLanguage<T>): T {
  const lang = getLanguage();
  const isZh = lang.startsWith('zh');
  if (!isZh) {
    return specifics.default;
  }
  if (lang.endsWith('CN')) {
    return specifics.chineseSimplified;
  }
  return specifics.chineseTraditional;
}
