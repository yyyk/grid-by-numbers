import { MenuLink } from './../../types/Menu'
import { actions, getters, mutations } from '@/store'

describe('mutations', () => {
  describe('SET_MENU', () => {
    it('sets menu', () => {
      const state = {
        menu: [] as MenuLink[],
        code: ''
      }
      const menu: MenuLink[] = [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ]
      mutations.SET_MENU(state, menu)
      expect(state.menu).toEqual([
        {
          title: 'title-1',
          path: 'path-1'
        }
      ])
    })
  })

  describe('UPDATE_CODE', () => {
    it('updates code', () => {
      const state = {
        menu: [] as MenuLink[],
        code: ''
      }
      const code = 'some code'
      mutations.UPDATE_CODE(state, code)
      expect(state.code).toBe('some code')
    })
  })
})

describe('actions', () => {
  describe('setMenu', () => {
    it('sets menu', () => {
      const commit = jest.fn()
      const menu: MenuLink[] = [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ]
      ;(actions as any).setMenu({ commit }, menu)
      expect(commit).toHaveBeenCalledWith('SET_MENU', [
        {
          title: 'title-1',
          path: 'path-1'
        }
      ])
    })
  })

  describe('updateCode', () => {
    it('updates code', () => {
      const commit = jest.fn()
      const code = 'some code'
      ;(actions as any).updateCode({ commit }, code)
      expect(commit).toHaveBeenCalledWith('UPDATE_CODE', 'some code')
    })
  })
})

describe('getters', () => {
  describe('menu', () => {
    it('returns menu', () => {
      const state = {
        menu: [
          {
            title: 'title-1',
            path: 'path-1'
          }
        ],
        code: ''
      }
      const actual = (getters as any).menu(state)
      expect(actual).toEqual([
        {
          title: 'title-1',
          path: 'path-1'
        }
      ])
    })
  })

  describe('code', () => {
    it('returns code', () => {
      const state = {
        menu: [],
        code: 'some code'
      }
      const actual = (getters as any).code(state)
      expect(actual).toBe('some code')
    })
  })
})
