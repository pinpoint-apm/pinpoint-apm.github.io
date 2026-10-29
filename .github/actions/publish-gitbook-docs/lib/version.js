/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

class Version {
    static parse(text) {
        const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(text)
        return match ? new Version(text, match.slice(1).map(Number)) : undefined
    }

    constructor(text, numbers) {
        this.text = text
        this.numbers = numbers
    }

    compare(other) {
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i] !== other.numbers[i]) {
                return this.numbers[i] - other.numbers[i]
            }
        }
        return 0
    }
}

module.exports = Version
