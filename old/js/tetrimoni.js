function buildField(type, size) {
  //Generate 2d array
  var field = [size];
  for (let y = 0; y < size; y++) {
    field[y] = [size];
    for (let x = 0; x < size; x++) {
      field[y][x] = 0;
    }
  }

  switch (type) {
    case 0:
      field[0][0] = 1;
      field[0][1] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      break;
    case 1:
      field[0][0] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      break;
    case 10:
      field[0][1] = 1;
      field[0][2] = 1;
      field[1][1] = 1;
      field[2][1] = 1;
      break;
    case 100:
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][2] = 1;
      break;
    case 1000:
      field[0][1] = 1;
      field[1][1] = 1;
      field[2][0] = 1;
      field[2][1] = 1;
      break;
    case 2:
      field[0][2] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      break;
    case 20:
      field[0][1] = 1;
      field[1][1] = 1;
      field[2][1] = 1;
      field[2][2] = 1;
      break;
    case 200:
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][0] = 1;
      break;
    case 2000:
      field[0][0] = 1;
      field[0][1] = 1;
      field[1][1] = 1;
      field[2][1] = 1;
      break;
    case 3:
    case 300:
      field[0][2] = 1;
      field[0][1] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      break;
    case 30:
    case 3000:
      field[0][1] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][2] = 1;
      break;
    case 4:
      field[0][1] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      break;
    case 40:
      field[0][1] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][1] = 1;
      break;
    case 400:
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][1] = 1;
      break;
    case 4000:
      field[0][1] = 1;
      field[1][0] = 1;
      field[1][1] = 1;
      field[2][1] = 1;
      break;
    case 5:
    case 500:
      field[0][0] = 1;
      field[0][1] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      break;
    case 50:
    case 5000:
      field[0][2] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[2][1] = 1;
      break;
    case 6:
    case 600:
      field[1][0] = 1;
      field[1][1] = 1;
      field[1][2] = 1;
      field[1][3] = 1;
      break;
    case 60:
    case 6000:
      field[0][2] = 1;
      field[1][2] = 1;
      field[2][2] = 1;
      field[3][2] = 1;
      break;
  }

  return field;
}
