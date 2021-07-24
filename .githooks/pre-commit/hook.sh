#!/bin/bash
[ -n "$CI" ] && exit 0

npm run test
