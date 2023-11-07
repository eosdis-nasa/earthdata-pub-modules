import { clearEmpties } from '../object'

describe('object:clearEmpties', () => {
    test('clears empties from a basic object', () => {
        expect(
            clearEmpties({
                foo: 'bar',
                imnull: null,
                imundefined: undefined,
                ihavenoproperties: {},
                ihaveproperties: {
                    foo: 'bar',
                },
            })
        ).toMatchInlineSnapshot(`
            Object {
              "foo": "bar",
              "ihaveproperties": Object {
                "foo": "bar",
              },
            }
        `)
    })

    test('clears empties from a object containing arrays', () => {
        expect(
            clearEmpties({
                foo: 'bar',
                imnull: null,
                imundefined: undefined,
                imarray: [
                    {
                        imnull: null,
                        imundefined: undefined,
                        foo: 'bar',
                    },
                ],
            })
        ).toMatchInlineSnapshot(`
            Object {
              "foo": "bar",
              "imarray": Array [
                Object {
                  "foo": "bar",
                },
              ],
            }
        `)
    })

    test('clears empties from a deeply nested object', () => {
        expect(
            clearEmpties({
                foo: 'bar',
                imnull: null,
                imundefined: undefined,
                ihavenoproperties: {},
                ihaveproperties: {
                    foo: 'bar',
                    deepobject: {
                        imsimplearray: ['foo', 'bar'],
                        imcomplexarray: [
                            {
                                deepobject: {
                                    foo: 'bar',
                                    imundefined: undefined,
                                },
                            },
                            {
                                foo: 'bar',
                            },
                        ],
                    },
                },
                imarray: [
                    {
                        imnull: null,
                        imundefined: undefined,
                        foo: 'bar',
                    },
                ],
            })
        ).toMatchInlineSnapshot(`
          Object {
            "foo": "bar",
            "ihaveproperties": Object {
              "deepobject": Object {
                "imcomplexarray": Array [
                  Object {
                    "deepobject": Object {
                      "foo": "bar",
                    },
                  },
                  Object {
                    "foo": "bar",
                  },
                ],
                "imsimplearray": Array [
                  "foo",
                  "bar",
                ],
              },
              "foo": "bar",
            },
            "imarray": Array [
              Object {
                "foo": "bar",
              },
            ],
          }
        `)
    })
})
