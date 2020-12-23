import { generateList } from '../list';

test('should generate a list', () => {
    //entrada:5    
    //arrange
    const amount = 5;
    //act
    const result = generateList(amount);
    //saída:[0,1,2,3,4]
    //assert
    expect(result).toEqual([0,1,2,3,4]);
});


test('should generate an empty list when amount is zero', () => {
    //entrada:5    
    //arrange
    const amount = 0;
    //act
    const result = generateList(amount);
    //saída:[0,1,2,3,4]
    //assert
    expect(result).toEqual([]);
});

