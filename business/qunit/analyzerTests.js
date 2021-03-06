dl.testData = {
  "asciiToPhysical": function(character) {
    return xm.config.keyboard[dl.testData.chords[character]]
  },
  "corpus": "(q)",
  "corpusStrokes": [
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
  "chords": {
    "q":["24"],
    "Q":["24","62"],
    "!":["24","108"],
    "j":["44"],
    "J":["44","50"],
    "(":["44","108"],
    ")":["44","108","50"],
    ";":["47"],
    ":":["47","50"],
    "r":["27"],
    "R":["27","62"],
    "$":["27","108"],
    "t":["28"],
    "T":["28","62"],
    "%":["28","108"]
  },
  "newScore": {
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
  },
  "scores": {}
}

dl.testData.todos = {
  "qj": {
      "homeToCurrent": [dl.testData.asciiToPhysical("j")],
      "previousToCurrent": [],
      "previousToHome": [dl.testData.asciiToPhysical("q")]
  },
  "Qj": {
    "homeToCurrent": [dl.testData.asciiToPhysical("j")],
    "previousToCurrent": [],
    "previousToHome": [dl.testData.asciiToPhysical("q"), 
                      xm.config.keyboard[xm.config.shiftRightKeycode]]
  },
  "qJ": {
    "homeToCurrent": [dl.testData.asciiToPhysical("j")],
    "previousToCurrent": [[dl.testData.asciiToPhysical("q"),
                          xm.config.keyboard[xm.config.shiftLeftKeycode]]],
    "previousToHome": []
  },
  "rt": {
    "homeToCurrent": [],
    "previousToCurrent": [[dl.testData.asciiToPhysical("r"),
                          dl.testData.asciiToPhysical("t")]],
    "previousToHome": []
  },
  "exclamLeftParen": {
    "homeToCurrent": [dl.testData.asciiToPhysical("j")],
    "previousToCurrent": [],
    "previousToHome": [dl.testData.asciiToPhysical("q")]
  }
}

// Set various score values.
function setTestScores() {
  var scores = dl.testData.scores;

  scores.rt = new dl.Score();
  scores.rt.fingers.leftIndex.strokes = 1;
  scores.rt.fingers.leftIndex.consecutive = 1;
  scores.rt.fingers.leftIndex.distance = 1;
  scores.rt.rows[1] = 1;

  scores.rtr = new dl.Score();
  scores.rtr.fingers.leftIndex.strokes = 2;
  scores.rtr.fingers.leftIndex.consecutive = 2;
  scores.rtr.fingers.leftIndex.distance = 2;
  scores.rtr.rows[1] = 2;

  scores.littleLittle = new dl.Score();
  scores.littleLittle.fingers.leftPinkie.distance = 1.0307764064044151;
  scores.littleLittle.fingers.rightIndex.strokes = 1;
  scores.littleLittle.rows[2] = 1;

  scores.bigLittle = new dl.Score();
  scores.bigLittle.fingers.leftPinkie.distance = 1.0307764064044151;
  scores.bigLittle.fingers.rightPinkie.distance = 1.8027756377319946;
  scores.bigLittle.fingers.rightIndex.strokes = 1;
  scores.bigLittle.rows[2] = 1;

  scores.littleBig = new dl.Score();
  scores.littleBig.fingers.leftPinkie.distance = 2.0155644370746373;
  scores.littleBig.fingers.leftPinkie.strokes = 1;
  scores.littleBig.fingers.leftPinkie.consecutive = 1;
  scores.littleBig.fingers.rightIndex.strokes = 1;
  scores.littleBig.rows[2] = 1;
  scores.littleBig.rows[3] = 1;
}

setTestScores();

// ### TESTS ###

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

// FIXME: This test relies on some of the same logic as what it is testing.
QUnit.test("dl.charactersToStrokes", function(assert) {
  function charactersToStrokesTest(corpusCharacter) {
    var expect =  _.map(dl.testData.chords[corpusCharacter], function(keycode) {
                    return xm.config.keyboard[keycode];
                  });

    assert.propEqual(
      dl.charactersToStrokes(corpusCharacter, dl.testData.chords), 
      expect
    );
  }

  charactersToStrokesTest("q");
  charactersToStrokesTest("Q");
  charactersToStrokesTest("(");
  charactersToStrokesTest(")");
  charactersToStrokesTest(":");

  assert.throws(function() {
    dl.charactersToStrokes("i", dl.testData.chords)
  }, /corpusChar not in chords/);
});

QUnit.test("dl.buildTodo", function(assert) {

  function testTodo(previousCharacter, currentCharacter, expect, message) {

    assert.propEqual(
      dl.buildTodo(
        // buildTodo takes strokes not characters
        dl.charactersToStrokes(previousCharacter, dl.testData.chords),
        dl.charactersToStrokes(currentCharacter, dl.testData.chords)
      ),
      expect,
      message
    );
  }

  testTodo("q", "j", dl.testData.todos.qj, "unrelated keys (qj)");
  testTodo("Q", "j", dl.testData.todos.Qj, "unrelated keys w/ unshift (Qj)");
  testTodo("q", "J", dl.testData.todos.qJ, "unrelated keys w/ upshift (qJ)");
  testTodo("r", "t", dl.testData.todos.rt, "previousToCurrent (rt)");
  testTodo("!", "(", dl.testData.todos.exclamLeftParen, 
          "unrelated keys w/ mod (!()");
});

QUnit.test("dl.isMaintainingMod", function(assert) {
  var altGr = xm.config.keyboard[xm.config.altGrKeycode],
      shiftLeft = xm.config.keyboard[xm.config.shiftLeftKeycode],
      shiftRight = xm.config.keyboard[xm.config.shiftRightKeycode];

  function testMaintainMod(previousStroke, currentStroke, expect, message) {
    assert.equal(
      dl.isMaintainingMod(previousStroke, currentStroke),
      expect,
      message
    );
  }

  testMaintainMod(altGr, altGr, true, "Maintain altGr");
  testMaintainMod(shiftLeft, shiftLeft, true, "Maintain shiftLeft");
  testMaintainMod(shiftRight, shiftRight, true, "Maintain shiftRight");
  testMaintainMod(shiftLeft, shiftRight, false, "leftShift to shiftRight");
  testMaintainMod(altGr, shiftRight, false, "altGr to shiftRight");
});

QUnit.test("dl.incrementScore", function(assert) {
  assert.propEqual(
    dl.incrementScore(
      new dl.Todo([], []),
      new dl.Score()
    ),
    new dl.Score(),
    "Increments nothing if nothing todo."
  );

  assert.propEqual(
    dl.incrementScore(dl.testData.todos.rt, new dl.Score()),
    dl.testData.scores.rt,
    "previousToCurrent (rt)"
  );

  assert.propEqual(
    dl.incrementScore(dl.testData.todos.rt, dl.testData.scores.rt),
    dl.testData.scores.rtr,
    "previousToCurrent on existing score (rt; tr)"
  );

  assert.propEqual(
    dl.incrementScore(dl.testData.todos.qj, new dl.Score()),
    dl.testData.scores.littleLittle,
    "unrelated keys (qj)"
  );

  assert.propEqual(
    dl.incrementScore(dl.testData.todos.Qj, new dl.Score()),
    dl.testData.scores.bigLittle,
    "unrelated keys w/ unshift (Qj)"
  );

  assert.propEqual(
    dl.incrementScore(dl.testData.todos.qJ, new dl.Score()),
    dl.testData.scores.littleBig,
    "unrelated keys w/ unshift (qJ)"
  );
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

QUnit.test("dl.Score", function(assert) {
  assert.propEqual(new dl.Score(), dl.testData.newScore);
});

QUnit.test("dl.Todo", function(assert) {
  var previousStrokes = dl.charactersToStrokes("q", dl.testData.chords),
      currentStrokes = dl.charactersToStrokes("j", dl.testData.chords)

  assert.propEqual(
    new dl.Todo(previousStrokes, currentStrokes),
    {
      "previousToHome": previousStrokes,
      "previousToCurrent": [],
      "homeToCurrent": currentStrokes
    }
  );
});
