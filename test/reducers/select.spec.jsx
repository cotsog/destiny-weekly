import reducer from '../../src/app/javascript/reducers/select.jsx';

describe('(Reducer) Select', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({activity: 'nightfall',options: [{advisorTypeCategory: 'Carregando...'}]})
  });

  it('should handle change api url', () => {
    expect(
      reducer([], {
        type: 'CHANGE_API_URL',
        activity: 'elderschallenge'
      })
    ).to.eql({
      activity: 'elderschallenge'
    })
  });
});