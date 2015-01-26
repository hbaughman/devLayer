dl.testData = {
  corpus: "(q)",
  corpusStrokes: [
    [
      {
        "finger": "rightIndex",
        "hand": "right",
        "x": 7.75,
        "y": 2
      },
      {
        "finger": "rightThumb",
        "hand": "right",
        "x": 10,
        "y": 4
      }
    ],
    [
      {
        "finger": "leftPinkie",
        "hand": "left",
        "x": 1.5,
        "y": 1
      }
    ],
    [
      {
        "finger": "rightIndex",
        "hand": "right",
        "x": 7.75,
        "y": 2
      },
      {
        "finger": "rightThumb",
        "hand": "right",
        "x": 10,
        "y": 4
      },
      {
        "finger": "leftPinkie",
        "hand": "left",
        "x": 1.25,
        "y": 3
      }
    ]
  ],
  chords: {
    "q": ["24"],
    "Q": ["24", "62"],
    "!": ["24", "108"],
    "j": ["44"],
    "J": ["44", "50"],
    "(": ["44", "108"],
    ")": ["44", "108", "50"],
    ";": ["47"],
    ":": ["47", "50"]
  },
  newScore: {
    "fingers": {
      "leftIndex": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "leftMiddle": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "leftPinkie": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "leftRing": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "leftThumb": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "rightIndex": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "rightMiddle": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "rightPinkie": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "rightRing": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      },
      "rightThumb": {
        "consecutive": 0,
        "distance": 0,
        "strokes": 0
      }
    },
    "rows": [
      0,
      0,
      0,
      0,
      0
    ]
  }
}

// FIXME: This test relies on some of the same logic as what it is testing.
QUnit.test("dl.keycodesToStrokes", function(assert) {
  function keycodesToStrokesTest(corpusCharacter) {
    var expect =  _.map(dl.testData.chords[corpusCharacter], function(keycode) {
                    return xm.config.keyboard[keycode];
                  });

    assert.propEqual(
      dl.keycodesToStrokes(corpusCharacter, dl.testData.chords), 
      expect
    );
  }

  keycodesToStrokesTest("q");
  keycodesToStrokesTest("Q");
  keycodesToStrokesTest("(");
  keycodesToStrokesTest(")");
  keycodesToStrokesTest(":");

  assert.throws(function() {
    dl.keycodesToStrokes("i", dl.testData.chords)
  }, /corpusChar not in chords/);
});

QUnit.test("dl.distanceBetween", function(assert) {
  function testDistance(fromKeycode, toKeycode, expectedDistance) {
    assert.equal(
      dl.distanceBetween(
        xm.config.keyboard[fromKeycode],
        xm.config.keyboard[toKeycode]
      ),
      expectedDistance
    );
  }

  testDistance("27", "28", 1);
  testDistance("41", "28", 1.25);
  testDistance("28", undefined, 1.25);

  assert.throws(function() {
    dl.distanceBetween(
      xm.config.keyboard["24"],
      xm.config.keyboard["27"]
    );
  }, /Different fingers used/);
});

QUnit.test("dl.corpusToCorpusStrokes", function(assert) {
  assert.propEqual(
    dl.corpusToCorpusStrokes(dl.testData.corpus, dl.testData.chords), 
    dl.testData.corpusStrokes,
    "All valid characters"
  );

  // FIXME: There must be a more elegant way to do this.
  var corpusStrokesDropped = _.clone(dl.testData.corpusStrokes);
  corpusStrokesDropped.push([])

  assert.propEqual(
    dl.corpusToCorpusStrokes("(q)<", dl.testData.chords),
    corpusStrokesDropped,
    "Drop invalid characters"
  );
});

QUnit.test("new Score", function(assert) {
  assert.propEqual(new dl.Score(), dl.testData.newScore);
});

QUnit.test("buildTodo", function(assert) {
  function testTodo(previousCharacter, currentCharacter, expect) {
    assert.propEqual(
      dl.buildTodo(
        dl.keycodesToStrokes(previousCharacter, dl.testData.chords),
        dl.keycodesToStrokes(currentCharacter, dl.testData.chords)
      ),
      expect
    );
  }

  testTodo(
    "q",
    "j",
    {
      "homeToCurrent": [
        {
          "finger": "rightIndex",
          "hand": "right",
          "x": 7.75,
          "y": 2
        }
      ],
      "previousToCurrent": [],
      "previousToHome": [
        {
          "finger": "leftPinkie",
          "hand": "left",
          "x": 1.5,
          "y": 1
        }
      ]
    }
  )

  // assert.propEqual(
  //   dl.buildTodo([xm.config.keyboard[chords"q"]], [xm.config.keyboard["j"]]),
  //   {}
  // );
});

// QUnit.test("dl.processCorpus", function(assert) {
//   assert.propEqual(
//     dl.processCorpus(dl.testData.corpus, dl.testData.chords),
//     dl.testData.newScore
//   );
// });