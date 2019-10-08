# 小児薬用量計算ツール（拡張Clark式）

[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html) - 拡張Clark式によって、小児の体重から薬用量の目安を算出するツールです。<BR>
A tool to calculate dosage for child with body weight via the extented Clark's rule.

## 説明 - Description

### ファイル - Files

このツールは以下の3つのファイルから成り立ちます。他にライブラリ等は必要ありません。
<BR>
This tool is constituted by 3 files following. No other libralies are need.

[extClark.css](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.css) - 画面デザインを定義するスタイルシートです。
<BR>
The style sheet which defines the screen designs.

[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html) - メインの HTML ファイルです。
ツールを使うには、ブラウザでこのファイルを開いてください。
<BR>
The main HTML file of this tool. Please open this file via your web browser.

[extClark.js](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.js) - ツールのエンジン部分である JavaScript ファイルです。
<BR>
The JavaScript file which is the engine of this tool.

### 機能 - Functions

+ 小児量計算 (順計算) - 小児の体重 (kg) と成人量 (g/mg/μg/T/mL) を入力すると、小児薬用量が表示されます。
+ 成人量計算 (逆計算) - 小児の体重 (kg) とその用量 (g/mg/μg/T/mL) を入力すると、成人量に換算されます。
+ 乗除算 - 原薬量計算や全量計算などのために、電卓のように乗除算ができます。

* Child dosage calculation (Normal calculation) - Input body weight (kg) of the child and the adult dosage (g/mg/μg/T/mL).
Then it shows the child dosage.
* Adult dosage calculation (Reverse calculation) - Input body weight (kg) of the child and the child dosage (g/mg/μg/T/mL).
Then it converts to the adult dosage.
* Multiplication/Division - You can multiplication and division as a calculator for ingredients calculation or total dosage calculation and so on.

### 拡張Clark式とは - What's extended Clark's rule?

拡張Clark式は、医薬品の最適な小児量を推定するための式の一つです。
本ツールの著作者である浦が考案したもので、米国などで使われている従来のClark式を改良し、推定精度を向上させています。
<BR>
The extended Clark's rule is one of the rules to estimale optimum child dosage.
It is a modification of the Clark's rule, and formulated by Ura the author of this tool.
It improves accuracy of estimation than the Clark's rule currently used in the U.S. and some other countries.
<BR>
<BR>
従来のClark式は、D<SUB>C</SUB> = D<SUB>A</SUB> ⋅ C / A で表されます。
ここで、D<SUB>C</SUB> は小児量の推定値、D<SUB>A</SUB>は 成人量です。
C と A は体重などの値を示し、C は小児の測定値、A は成人の基準値です。
特に、体重で小児量を推定する場合、A の値は、成人体重として 150ポンド が用いられます。
<BR>
On the Clark's rule, we estimate child dosage via D<SUB>C</SUB> = D<SUB>A</SUB> ⋅ C / A.
Now D<SUB>C</SUB> is the estimated child dosage and D<SUB>A</SUB> is the adult dosage.
C and A are values of measurement, for example, body weight.
C is the child's measured value and A is the standard value for adult.
Especially when we estimate via body weight, we use 150 lb for A.
<BR>
<BR>
拡張Clark式は、D<SUB>C</SUB> = D<SUB>A</SUB> (C / A)<SUP>k</SUP> で表されます。
ここで、D<SUB>C</SUB>、D<SUB>A</SUB>、C、A の意味は従来のClark式と同じです。
k は体重など測定値の次元を体表面積の次元に合わせるための指数です。
通常、最適な薬用量は体表面積に比例するとされているので、より良い推定のため、次元を体表面積の次元 (2次元) に合わせます。
体重の場合、次元は3次元なので、k=2/3 です。
また、A の成人体重の値は、必ずしも 150ポンド とする必要はなく、患児の年齢や性別、あるいは人種などの条件を考慮して、柔軟に選ぶことができます。
<BR>
On the extended Clark's rule, we estimate child dosage via D<SUB>C</SUB> = D<SUB>A</SUB> (C / A)<SUP>k</SUP>.
Now the meanings of D<SUB>C</SUB>, D<SUB>A</SUB>, C and A are same as the normal Clark's rule.
The k is an index number added to equalize the dimension of the mesurement value to body surface dimension.
Generally optimum dosage is considered to be in proportion to the body surface dimension,
so we equalize the dimension to body surface dimension (2D) for better estimation.
In the case of body weight, we use k=2/3 because the dimension of body weight is 3D.
And we don't have to fix 150 lb as the adult weight for A.
We can take a value of A flexibly considering the child's age and sex, or race and other conditions.

## 注意 - Remark

現在、本ツールの対象は日本人患者のみです。
小児量の推定に用いる成人体重(基準値)は西暦2000年度の日本人小児の体格の統計データをもとに計算されています。
<BR>
This tool of this version is for Japanese patients only.
The adult weights (criterions) which are used to estimate child dosage have been computed
based on the statistical body mass data of Japanese children at the year 2000.
<BR>
<BR>
日本人以外に本ツールを適用する場合は、予め、対象となる国あるいは人種の小児の体格の統計データを用いて解析し、
成人体重(基準値)や年齢区分を調整することを推奨します。
<BR>
If you want to use this tool for non-Japanese patients,
it is recommended to adjust the adult weights (criterions) and/or the segmentations of children ages
with analysis the body mass data of the country or the race of the target patients.

## 使用方法 - Usage

本ツールは、電卓と同じような感覚で、直感的に操作できます。
<BR>
You can use this tool like a calculator instinctively.
<BR>
<BR>
最も単純に使ってみるには、小児の体重を入力して「kg」ボタンを押してください。
デフォルトで成人量に 1g が入っていますので、成人量 1g の場合の小児量が「入出力」に表示されます。
<BR>
For the most simple try, input a sample child's body weight and push the "kg" button.
As the default adult dosage is 1g, so the I/O area will show the child dosage where the adult dosage is 1g.
<BR>
<BR>
成人量を入力して「g」のボタンを押せば、「入出力」に、新しく入力された成人量に対する小児量が表示されます。
<BR>
Now input the adult dosage and push "g" button.
Then the I/O area will show the child dosage for inputted adult dosage.
<BR>
<BR>
「年齢」と「性別」は「無指定」のままでも計算できますが、正しい年齢と性別を選択した方が、より計算精度が良くなります。
<BR>
The "age" and "sex" can be kept the default "non-selected", but it is recommended to select the collect age and sex for accuracy enhancement.
<BR>
<BR>
入出力には、キーボードからの直接入力はできません。画面上のボタンで入力してください。
<BR>
You can't input direct by keyboard into I/O area.
Please use the buttons on the screeen.
<BR>
<BR>
「成人体重(基準値)」は「年齢」「性別」の選択により自動的に決まるので、直接入力はできません。
<BR>
The "adult weight(criterions)" is determined according to "age" and "sex", so you can't input direct into it.
<BR>
<BR>
「AC」ボタンは小児の体重、入出力をクリアして、成人量をデフォルトに戻します。
<BR>
The "AC" button clears the child's weight and I/O area and returns the adult dosage to the default.
<BR>
<BR>
「C」ボタンは現在入力中の値をクリアするだけで、入力済みの体重と成人量はクリアしません。
<BR>
The "C" button just clears current inputting value on I/O area.
It doesn't clear the child's weight nor the adult dosage.
<BR>
<BR>
「×,÷」ボタンを押すと、乗除算用の画面に切り替わります。「kg,g」ボタンで元の画面に戻ります。
<BR>
The "×,÷" button make the screen to change into the multiplication/division mode.
The "kg,g" button make the screen to turn back.
<BR>
<BR>
「計算方法」で「逆計算」を選ぶと、成人量計算 (逆計算) 用の画面に切り替わります。
「順計算」を選ぶと、元の画面に戻ります。
<BR>
At the "Direction of calculation", when you select "reverse",
the screen changes into the adult dosage calculation (reverse calculation) mode.
When you select "normal", the screen turns back.
<BR>
<BR>
より詳しい説明は、仕様書またはマニュアルを参照してください。
<BR>
For more detail, read the specification or the manual.

## インストール方法 - Install

3つのファイル
([extClark.css](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.css),
[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html),
[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.js))
をPCやスマホ等のどこでも好きなフォルダに置けばインストール完了です。
<BR>
Put 3 files
([extClark.css](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.css),
<A href="https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html">extClark.html</A>,
<A href="https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.js">extClark.js</A>)
into a same folder of your PC or mobile device wherever. That's all.
<BR>
<BR>
必要に応じて、
[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html)
へのショートカット等を作成してください。
<BR>
If you need, please create a shortcut to
[extClark.html](https://github.com/Kimitsuna-Goblin/extClark/blob/master/extClark.html).

## 関連ドキュメント - Documents

本ツールに関するドキュメント類 (仕様書、不具合記録、マニュアル等) は別リポジトリ
([extClark-Doc](https://github.com/Kimitsuna-Goblin/extClark-Doc))
にて
[CC BY-SA 4.0](https://github.com/Kimitsuna-Goblin/extClark-Doc/blob/master/LICENSE)
ライセンスの下で提供されています。
<BR>
The documents (specification, bug report, manual, etc.) for this tool are provided at an other repository
([extClark-Doc](https://github.com/Kimitsuna-Goblin/extClark-Doc))
under
the [CC BY-SA 4.0](https://github.com/Kimitsuna-Goblin/extClark-Doc/blob/master/LICENSE)
license.

## ツールへの貢献 - Contribution

もし、ツールの仕様 (機能、インタフェース、画面デザイン等) を変更し、
[master](https://github.com/Kimitsuna-Goblin/extClark)
を更新する場合は、
[関連ドキュメント](https://github.com/Kimitsuna-Goblin/extClark-Doc)
の
[外部設計書](https://github.com/Kimitsuna-Goblin/extClark-Doc/blob/master/%E4%BB%95%E6%A7%98%E6%9B%B8/%E5%B0%8F%E5%85%90%E8%96%AC%E7%94%A8%E9%87%8F%E8%A8%88%E7%AE%97%E3%83%84%E3%83%BC%E3%83%AB(%E6%8B%A1%E5%BC%B5Clark%E5%BC%8F)_%E5%A4%96%E9%83%A8%E8%A8%AD%E8%A8%88%E6%9B%B8.pdf)
も併せて更新し、著作者名を記入してください。
<BR>
If you would change the specifications (functions, interfaces, screen designs, etc.)
and update [master](https://github.com/Kimitsuna-Goblin/extClark),
plaese also update the [documents](https://github.com/Kimitsuna-Goblin/extClark-Doc) and fill the copyright in
the [specification](https://github.com/Kimitsuna-Goblin/extClark-Doc/blob/master/%E4%BB%95%E6%A7%98%E6%9B%B8/%E5%B0%8F%E5%85%90%E8%96%AC%E7%94%A8%E9%87%8F%E8%A8%88%E7%AE%97%E3%83%84%E3%83%BC%E3%83%AB(%E6%8B%A1%E5%BC%B5Clark%E5%BC%8F)_%E5%A4%96%E9%83%A8%E8%A8%AD%E8%A8%88%E6%9B%B8.pdf).

## ライセンス - Licence

[MIT](https://github.com/Kimitsuna-Goblin/extClark/blob/master/LICENSE)

## 著作者 - Author

[Kimitsuna-Goblin](https://github.com/Kimitsuna-Goblin) (浦 公統)
