declare module 'react-native-sqlite-storage' {
    export const openDatabase: (
      params: {
        name: string;
        location?: string;
        createFromLocation?: string;
      },
      success: () => void,
      error?: (err: any) => void,
    ) => any;
  }
  