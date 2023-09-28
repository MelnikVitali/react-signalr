import { IMessageHub } from '@/interfaces/IMessageHub';
import { INavItem } from '@/interfaces/INavItem';

export const getNewData = (data: INavItem[], message: IMessageHub): INavItem[] => {
  return data.map((obj, i) => {
    const idMessage = JSON.parse(message as unknown as string)?.id;
    const messageFromMessage = JSON.parse(message as unknown as string)?.message;
    if (i === idMessage) {
      const newOptions = [messageFromMessage, ...obj.options];
      return { ...obj, options: newOptions };
    }
    return obj;
  });
};
