import { userReducer } from './use-reducer'

test('user reducer should increment only age', () => {
  const startState = { age: 20, childrenCount: 2, name: 'Mike' }
  const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

  expect(endState.age).toBe(21)
  expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
  const starState = { age: 20, childrenCount: 2, name: 'Mike' }
  const endState = userReducer(starState, { type: 'INCREMENT-CHILDREN-COUNT' })

  expect(endState.age).toBe(20)
  expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
  const starState = { age: 20, childrenCount: 2, name: 'Mike' }
  const newName = 'Linda'
  const endState = userReducer(starState, { type: 'CHANGE-NAME', newName })

  expect(endState.age).toBe(20)
  expect(endState.childrenCount).toBe(2)
  expect(endState.name).toBe(newName)
})