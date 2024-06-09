import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
type ModalName = "default" | "Liked" | "FindUserForChat" | "FindUserForGroup" 
interface ModalState {
    modalName: ModalName,
    isModalOpen: boolean,
    modalData?: any
}

// Define the initial state using that type
const ModalState: ModalState = {
    modalName: "default",
    isModalOpen: false,
    modalData: undefined
}

export const ModalSlice = createSlice({
    name: 'Modal',
    initialState: ModalState,
    reducers: {
        openModal: (state, action: PayloadAction<{ modalName: ModalName, modalData?: any }>) => {
            state.modalName = action.payload.modalName
            state.isModalOpen = true
            state.modalData = action.payload.modalData
        },
        closeModal: (state) => {
            state.isModalOpen = false
        },
    },
    extraReducers: (builder) => {

    },
})

export const {
    openModal,
    closeModal
} = ModalSlice.actions

export default ModalSlice.reducer