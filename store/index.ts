import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { MenuLink } from '@/types/Menu'

export const state = () => ({
  menu: [] as MenuLink[],
  code: '// enter program\n'
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  menu: (state) => state.menu,
  code: (state) => state.code
}

export const mutations: MutationTree<RootState> = {
  SET_MENU: (state, menu) => (state.menu = menu),
  UPDATE_CODE: (state, newCode: string) => (state.code = newCode)
}

export const actions: ActionTree<RootState, RootState> = {
  setMenu: ({ commit }, menu: MenuLink[] = []) => {
    commit('SET_MENU', menu)
  },
  updateCode: ({ commit }, newCode: string) => {
    commit('UPDATE_CODE', newCode)
  }
}
