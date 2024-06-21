import create from "zustand";

interface FormState {
  isValid: boolean;
  formData: {
    name: string;
    price: number;
    description: string;
    image?: string;
  };
  setIsValid: (isValid: boolean) => void;
  setFormData: (data: Partial<FormState["formData"]>) => void;
  resetFormData: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  isValid: false,
  formData: {
    name: "",
    price: 0,
    description: "",
    image: "",
  },
  setIsValid: (isValid) => set({ isValid }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () =>
    set({
      formData: {
        name: "",
        price: 0,
        description: "",
        image: "",
      },
    }),
}));
