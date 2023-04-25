Feature: Add two numbers
    We should be able to add two numbers

  Scenario Outline: Add two numbers
    Given My numbers are <a> and <b>
    When I ask what is the sum
    Then I should be told <sum>

    Examples: 
      | a | b | sum |
      | 1 | 2 |   3 |
      | 5 | 7 |  12 |
      | 3 | 3 |   6 |
      | 0 | 0 |   0 |
