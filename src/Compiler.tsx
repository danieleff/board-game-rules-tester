import * as ts from 'typescript';

export function compileString<T>(sourceString: string): T {
    const compileResult = ts.transpileModule(sourceString, {
      compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React}
    });
  
    const resultObject = eval("var exports = {}\n;" + compileResult.outputText + ";\n exports;");
  
    return resultObject;
}
