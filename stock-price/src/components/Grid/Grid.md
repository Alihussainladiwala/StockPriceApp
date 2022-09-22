# Grid Component
## Input:
- **Headers** : headers for the grid display eg: ["Symbol", "LastPrice", "Tag", "Actions"]
- **rows**: rows for the grid eg: [{"symbol": "CSCO", "lastPrice": 20, "tag": "watching"}, {"symbol": "AAPL", "lastPrice": 100, "tag": "forFriends"}]
- **isButton**: to mark columns as buttons of different types: eg: [{ name:  "Action", type:  "delete" },{ name:  "id", type:  "default" }];

## Output:
- **onButtonClick**: returns the the button type that was clicked eg: delete, default and the row that was clicked on the grid.



