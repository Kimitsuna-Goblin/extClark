/*!
 *	Copyright (C) 2019 ＧＯＢ
 *	Released under the MIT license.
 *	see https://opensource.org/licenses/MIT/
 */

/**
 *	@file		extClark.js
 *	@brief		小児薬用量計算ツール (拡張Clark式) JavaScriptファイル
 *	@version	0.91
 */

////////////////////////////////////////////////////////////////////////
//	グローバル変数
var gOlds = [];					///< 年齢ラジオボタン
var gSexs = [];					///< 性別ラジオボタン

var gAdultWeight = null;		///< 成人体重テキスト
var gChildWeight = null;		///< 体重テキスト (小児体重用)
var gInputDosage = null;		///< 成人量/小児量テキスト (用量計算における入力値)
var gHoldChildWeight = null;	///< 体重テキスト ホールド表示用
var gHoldInputDosage = null;	///< 成人量/小児量テキスト ホールド表示用

var gValueText = null;			///< 入出力テキスト
var gUnitText = null;			///< 入出力テキストの単位表示

var gCalButtons = [];			///< すべての入力ボタン
var gCalNums = [];				///< 数字ボタン
var gCalAC = null;				///< ACボタン (全クリアボタン)
var gCalC = null;				///< Cボタン (入出力クリアボタン)
var gDosageArea = null;			///< 薬用量計算画面用ボタンエリア
var gMultiplyArea = null;		///< 乗除算画面用ボタンエリア
var gAreaChange1 = null;		///< 乗除算画面切替えボタン (エリア切替えボタン1)
var gAreaChange2 = null;		///< 薬用量計算画面切替えボタン (エリア切替えボタン2)
var gCalkg = null;				///< 体重ボタン (kgボタン)
var gCalDosage = null;			///< 用量ボタン
var gCalMultiply = null;		///< 乗算ボタン
var gCalDivide = null;			///< 除算ボタン
var gCalEqual = null;			///< 等号ボタン
var gCalback = null;			///< 1字削除ボタン
var gCaldot = null;				///< 小数点ボタン
var gCalDosageImages = [];		///< 用量ボタンの画像

var gUnits = [];				///< 用量単位ラジオボタン
var gUnderPoint = null;			///< 桁数ドロップダウンリスト (小数点以下桁数の選択)
var gDirection = null;			///< 計算方法ドロップダウンリスト

var gDosageUnit = null;			///< 用量単位の選択値

var gCalcMem = null;			///< 計算用メモリ
var gIsMemDetail = false;		///< 計算用メモリに高精度の計算結果が保持されているかどうかのフラグ
var gPrevButton = null;			///< 直前に押下したボタン
var gCalcOperator = 0;			///< 計算中の演算 (OPERATOR_MULTI:乗算, OPERATOR_DIVIDE:除算)

////////////////////////////////////////////////////////////////////////
//	定数
var MAX_LEN_VALUE = 8;			///< 入力可能な最大文字数

var DFLT_OLD_INDEX = 0;			///< 年齢の初期値
var DFLT_SEX_INDEX = 0;			///< 性別の初期値
var DFLT_CHILD_WEIGHT = 0;		///< 小児体重の初期値
var DFLT_ADULT_DOSAGE = 1;		///< 成人量の初期値
var DFLT_VALUE = 0;				///< 入力の初期値
var DFLT_UNIT_INDEX = 0;		///< 用量単位の初期値

var ADLUT_WEIGHTS =	[];			///< 成人体重(基準値)

var UNIT_STRINGS = {};			///< 用量単位の表示用文字列

var DOSAGE_HEADER_STRINGS = [];	///< 成人量/小児量テキストのヘッダ文字列
var TH_BGCOLORS = [];			///< 表のタイトルセルの色 (順計算/逆計算の画面表示用)
var TD_BGCOLORS = [];			///< 表のデータセルの色 (順計算/逆計算の画面表示用)

var HOLD_ON = '&lt;HOLD&gt;';	///< ホールド中の表示文字列
var HOLD_OFF = '&nbsp;';		///< ホールド解除の表示文字列

var OPERATOR_NONE = 0;			///< 計算中の演算なし
var OPERATOR_MULTI = 1;			///< 計算中の演算(乗算)
var OPERATOR_DIVIDE = 2;		///< 計算中の演算(除算)

var MAX_CALC_VALUE = 100000000000.0;
								///< 計算可能な値の上限値

var ERROR_VALUE = '-';			///< エラー時の出力文字列

/**
 *	初期設定
 */
function onLoadEvent()
{
	//	定数設定
	MAX_LEN_VALUE = 8;			//	入力可能な最大文字数

	DFLT_OLD_INDEX = 0;			//	年齢の初期値
	DFLT_SEX_INDEX = 0;			//	性別の初期値
	DFLT_CHILD_WEIGHT = 0;		//	小児体重の初期値
	DFLT_ADULT_DOSAGE = 1;		//	成人量の初期値
	DFLT_VALUE = 0;				//	入出力の初期値
	DFLT_UNIT_INDEX = 0;		//	用量単位の初期値

	ADLUT_WEIGHTS =	[
						[ 68, 68, 68],			//	年齢無指定	[性別無指定, 男性, 女性]
						[ 70, 70, 70],			//	0歳			[性別無指定, 男性, 女性]
						[ 68, 64.30, 62.80 ]	//	1～15歳		[性別無指定, 男性, 女性]
					];			//	成人体重(基準値)

	UNIT_STRINGS = { g:'g', mg:'mg', gamma:'μg', T:'T', mL:'mL' };
								//	用量単位の表示用文字列

	DOSAGE_HEADER_STRINGS = [ '成人量', '小児量' ];	//	成人量/小児量テキストのヘッダ文字列
	TH_BGCOLORS = [ '#fcdcbc', '#f0f0ec' ];			//	表のタイトルセルの色 (順計算/逆計算の画面表示用)
	TD_BGCOLORS = [ '#fcfcfc', '#fcdcbc' ];			//	表のデータセルの色 (順計算/逆計算の画面表示用)

	HOLD_ON = '&lt;HOLD&gt;';	//	ホールド中の表示文字列
	HOLD_OFF = '&nbsp;';		//	ホールドしていないときの表示文字列

	OPERATOR_NONE = 0;			//	計算中の演算なし
	OPERATOR_MULTI = 1;			//	計算中の演算(乗算)
	OPERATOR_DIVIDE = 2;		//	計算中の演算(除算)

	MAX_CALC_VALUE = 100000000000.0;
								//	計算可能な値の上限値

	ERROR_VALUE = '-';			//	エラー時の出力文字列

	//	グローバル変数にオブジェクトを設定
	gOlds = [
				document.getElementById( 'old0' ),
				document.getElementById( 'old1' ),
				document.getElementById( 'old2' )
			];
	gSexs = [
				document.getElementById( 'sex0' ),
				document.getElementById( 'sex1' ),
				document.getElementById( 'sex2' )
			];

	gAdultWeight = document.getElementById( 'adultWeight' );
	gChildWeight = document.getElementById( 'childWeight' );
	gInputDosage = document.getElementById( 'inputDosage' );
	gHoldChildWeight = document.getElementById( 'holdChildWeight' );
	gHoldInputDosage = document.getElementById( 'holdInputDosage' );

	gValueText = document.getElementById( 'valueText' );
	gUnitText = document.getElementById( 'unitText' );

	for ( var i = 0; i <= 9; i++ )
	{
		gCalNums.push( document.getElementById( 'btn' + i ) );
	}
	gCalAC = document.getElementById( 'btnAC' );
	gCalC = document.getElementById( 'btnC' );
	gDosageArea = document.getElementById( 'dosageArea' );
	gMultiplyArea = document.getElementById( 'multiplyArea' );
	gAreaChange1 = document.getElementById( 'btnAreaChange1' );
	gAreaChange2 = document.getElementById( 'btnAreaChange2' );
	gCalkg = document.getElementById( 'btnkg' );
	gCalDosage = document.getElementById( 'btnDosage' );
	gCalMultiply = document.getElementById( 'btnMultiply' );
	gCalDivide = document.getElementById( 'btnDivide' );
	gCalEqual = document.getElementById( 'btnEqual' );
	gCalback = document.getElementById( 'btnback' );
	gCaldot = document.getElementById( 'btndot' );

	gCalButtons = gCalNums.concat( [ gCalAC, gCalC, gAreaChange1, gAreaChange2,
									gCalkg, gCalDosage,
									gCalMultiply, gCalDivide, gCalEqual,
									gCalback, gCaldot ] );

	gUnits = [
				document.getElementById( 'unitRadio0' ),
				document.getElementById( 'unitRadio1' ),
				document.getElementById( 'unitRadio2' ),
				document.getElementById( 'unitRadio3' ),
				document.getElementById( 'unitRadio4' )
			];
	gUnderPoint = document.getElementById( 'underPoint' );
	gDirection = document.getElementById( 'direction' );

	gCalcMem = null;
	gIsMemDetail = false;
	gPrevButton = null;
	gCalcOperator = OPERATOR_NONE;

	//	イベントリスナー設定
	for ( var i = 0; i < gOlds.length; i++ )
	{
		gOlds[i].addEventListener( 'change', setAdultWeight, false );
	}
	for ( var i = 0; i < gSexs.length; i++ )
	{
		gSexs[i].addEventListener( 'change', setAdultWeight, false );
	}

	for ( var i = 0; i < gCalButtons.length; i++ )
	{
		gCalButtons[i].addEventListener( 'mouseover', onCalMouseOver, false );
		gCalButtons[i].addEventListener( 'mouseleave', onCalMouseLeave, false );
		gCalButtons[i].addEventListener( 'mousedown', onCalMouseDown, false );
		gCalButtons[i].addEventListener( 'mouseup', onCalMouseUp, false );
		gCalButtons[i].addEventListener( 'click', onCalClick, false );
	}

	for ( var i = 0; i < gUnits.length; i++ )
	{
		gUnits[i].addEventListener( 'change', setDosageUnit, false );
	}
	gUnderPoint.addEventListener( 'change', onChangeUnderPoint, false );

	gDirection.addEventListener( 'change', onChangeDirection, false );

	//	薬用量計算画面用ボタンエリア表示
	gDosageArea.style.display = 'table-cell';
	gMultiplyArea.style.display = 'none';

	//	ホールド解除
	gHoldChildWeight.innerHTML = HOLD_OFF;
	gHoldInputDosage.innerHTML = HOLD_OFF;

	//	用量単位表示を初期化
	setDosageUnit();

	//	薬用量計算方法の順逆に合わせて画面表示
	adjustDirection();

	//	年齢・性別・成人体重を初期化 (必要なら出力再計算)
	setAdultWeight();
}

/**
 *	選択されているラジオボタンの value を取得する
 *	@param	radios			ラジオボタンの配列
 *	@param	defaultIndex	デフォルトの選択ボタンのインデックス
 *	@return	選択されているラジオボタンの value
 */
function getCheckedValue( radios, defaultIndex )
{
	var value = null;

	for ( var i = 0; i < radios.length; i++ )
	{
		if ( radios[i].checked )
		{
			value = radios[i].value;
			break;
		}
	}

	if ( value === null )
	{
		//	選択がおかしい場合はデフォルトを選択し、ラジオボタンの画面表示もそれに合わせる
		//	 (例えば、Microsoft Edge で別ページを閲覧後に戻ってきたとき、この処理を通る)
		value = radios[defaultIndex].value;
		for ( var i = 0; i < radios.length; i++ )
		{
			radios[i].checked = ( i == defaultIndex );
		}
	}

	return value;
}

/**
 *	入出力テキストに薬用量が出力済みかどうかを調べる
 *	@return	薬用量が出力済みかどうかのフラグ (boolean)
 */
function isCalDone()
{
	//	画面の状態と機能の動作を確実に合わせるために、メモリの状態ではなく、
	//	画面の表示状態を参照することによって、薬用量が出力済みかどうかを判断する
	return ( gUnitText.value.length > 0 );
}

/**
 *	用量単位ラジオボタンの選択に応じて用量単位を表示する
 */
function setDosageUnit()
{
	//	用量単位ラジオボタンの選択値取得
	gDosageUnit = getCheckedValue( gUnits, DFLT_UNIT_INDEX );

	//	成人量/小児量の単位表示
	document.getElementById( 'dosageUnit' ).innerHTML = UNIT_STRINGS[gDosageUnit];

	//	用量ボタンの画像設定
	gCalDosageImages = [];
	for ( var i = 0; i <= 2; i++ )
	{
		gCalDosageImages.push( 'button/btn' + gDosageUnit + '_' + i + '.png' );
	}

	//	用量ボタン表示
	//		この関数が呼ばれるときは、用量ボタンにフォーカスは無い。
	//		なので、通常時のボタンを表示すればよい。
	gCalDosage.src = gCalDosageImages[0];
	gCalDosage.alt = UNIT_STRINGS[gDosageUnit];

	//	入出力テキストに薬用量が出力されていれば、その単位も表示
	if ( isCalDone() )
	{
		gUnitText.value = UNIT_STRINGS[gDosageUnit];
	}
}

/**
 *	年齢と体重のラジオボタンの選択に応じて成人体重(基準値)を設定する
 */
function setAdultWeight()
{
	var old = Number( getCheckedValue( gOlds, DFLT_OLD_INDEX ) );	//	年齢のラジオボタン選択値
	var sex = Number( getCheckedValue( gSexs, DFLT_SEX_INDEX ) );	//	性別のラジオボタン選択値

	gAdultWeight.value = ADLUT_WEIGHTS[old][sex];

	//	薬用量が出力済みであれば、薬用量を再計算
	if ( isCalDone() )
	{
		calDosage();
	}
}

/**
 *	ボタンの上にマウスが来たときの処理
 *	@param	e	発生したイベント
 */
function onCalMouseOver( e )
{
	if ( e.target.id == gCalDosage.id )
	{
		e.target.src = gCalDosageImages[1];
	}
	else
	{
		e.target.src = 'button/' + e.target.id + '_1.png';
	}
}

/**
 *	ボタンからマウスが出ていったときの処理
 *	@param	e	発生したイベント
 */
function onCalMouseLeave( e )
{
	if ( e.target.id == gCalDosage.id )
	{
		e.target.src = gCalDosageImages[0];
	}
	else
	{
		e.target.src = 'button/' + e.target.id + '_0.png';
	}
}

/**
 *	ボタンを押したときの処理
 *	@param	e	発生したイベント
 */
function onCalMouseDown( e )
{
	if ( e.target.id == gCalDosage.id )
	{
		e.target.src = gCalDosageImages[2];
	}
	else
	{
		e.target.src = 'button/' + e.target.id + '_2.png';
	}
}

/**
 *	ボタンを押し終わったときの処理
 *	@param	e	発生したイベント
 */
function onCalMouseUp( e )
{
	if ( e.target.id == gCalDosage.id )
	{
		e.target.src = gCalDosageImages[1];
	}
	else
	{
		e.target.src = 'button/' + e.target.id + '_1.png';
	}
}

/**
 *	ボタンクリック時の処理
 *	@param	e	発生したイベント
 *	@return	常に false を返す
 */
function onCalClick( e )
{
	for ( var i = 0; i < gCalNums.length; i++ )
	{
		if ( e.target.id == gCalNums[i].id )
		{
			//	数字ボタン押下
			if ( gIsMemDetail || isOperatorPushed() )
			{
				//	メモリに計算結果があるか、乗算・除算ボタンを押した直後であれば一旦クリア
				resetCal();
			}

			if ( gValueText.value.length < MAX_LEN_VALUE )
			{
				if ( gValueText.value == '0' )
				{
					//	入出力テキストの表示が「0」だったら、その「0」を消して押したボタンの数字を表示
					gValueText.value = String( i );
				}
				else
				{
					gValueText.value += String( i );
				}
			}

			gIsMemDetail = false;	//	入出力テキストの表示はメモリの計算結果と異なる (i.e.メモリに計算結果なし)
			gPrevButton = e.target.id;
			return false;
		}
	}

	switch ( e.target.id )
	{
	case gCalAC.id:
		//	全クリア
		if ( !isMultiplyMode() )
		{
			//	薬用量計算画面の場合、体重と成人量/小児量をクリア
			gChildWeight.value = DFLT_CHILD_WEIGHT;
			gInputDosage.value = DFLT_ADULT_DOSAGE;
		}

		//	計算用メモリ・乗除算用グローバル変数をクリア
		gCalcMem = null;
		gIsMemDetail = false;
		gCalcOperator = OPERATOR_NONE;

		resetCal();
		break;
	case gCalC.id:
		//	入力クリア
		resetCal();
		break;
	case gAreaChange1.id:
		//	乗除算画面用ボタンエリア表示
		gDosageArea.style.display = 'none';
		gMultiplyArea.style.display = 'table-cell';

		//	ホールド
		gHoldChildWeight.innerHTML = HOLD_ON;
		gHoldInputDosage.innerHTML = HOLD_ON;

		//	乗除算用グローバル変数が壊れていたら初期化
		gCalcOperator = ( gCalcOperator === undefined || gCalcOperator === null )
						? OPERATOR_NONE : gCalcOperator;
		break;
	case gAreaChange2.id:
		//	薬用量計算画面用ボタンエリア表示
		gDosageArea.style.display = 'table-cell';
		gMultiplyArea.style.display = 'none';

		//	ホールド解除
		gHoldChildWeight.innerHTML = HOLD_OFF;
		gHoldInputDosage.innerHTML = HOLD_OFF;
		break;
	case gCalkg.id:
		//	小児体重入力
		if ( isCalDone() )
		{
			//	既に薬用量が出力済みの場合は無効
			break;
		}
		gCalcOperator = OPERATOR_NONE;	//	もし乗除算の途中であれば、計算はここで中断

		var value = gValueText.value;

		if ( value[value.length - 1] == '.' )
		{
			//	末尾が小数点だったら小数点削除
			value = value.substring( 0, value.length - 1 );
		}

		gChildWeight.value = value;
		calDosage();
		break;
	case gCalDosage.id:
		//	成人量/小児量入力
		if ( isCalDone() )
		{
			//	既に薬用量が出力済みの場合は無効
			break;
		}
		gCalcOperator = OPERATOR_NONE;	//	もし乗除算の途中であれば、計算はここで中断

		var value = gValueText.value;

		if ( value[value.length - 1] == '.' )
		{
			//	末尾が小数点だったら小数点削除
			value = value.substring( 0, value.length - 1 );
		}

		gInputDosage.value = value;
		calDosage();
		break;
	case gCalMultiply.id:
		//	乗算ボタン
		if ( isCalDone() )
		{
			//	薬用量が出力済みのときは用量単位をクリアして、乗除算用の表示にする
			//	(数値は残したまま)
			gUnitText.value = '';
		}

		if ( gPrevButton == e.target.id )
		{
			//	ボタン二重押しは無効
			break;
		}
		else if ( gPrevButton == gCalDivide.id )
		{
			//	除算ボタン→乗算ボタン 連続押下
			//	計算中の演算変更 (変更のみで計算はしない)
			gCalcOperator = OPERATOR_MULTI;
			break;
		}

		//	計算実行
		calcOperation();

		//	乗算の計算中
		gCalcOperator = OPERATOR_MULTI;
		break;
	case gCalDivide.id:
		//	除算ボタン
		if ( isCalDone() )
		{
			//	薬用量が出力済みのときは用量単位をクリアして、乗除算用の表示にする
			//	(数値は残したまま)
			gUnitText.value = '';
		}

		if ( gPrevButton == e.target.id )
		{
			//	ボタン二重押しは無効
			break;
		}
		else if ( gPrevButton == gCalMultiply.id )
		{
			//	乗算ボタン→除算ボタン 連続押下
			//	計算中の演算変更 (変更のみで計算はしない)
			gCalcOperator = OPERATOR_DIVIDE;
			break;
		}

		//	計算実行
		calcOperation();

		//	除算の計算中
		gCalcOperator = OPERATOR_DIVIDE;
		break;
	case gCalEqual.id:
		//	等号ボタン
		if ( isCalDone() || gPrevButton == e.target.id )
		{
			//	薬用量が出力済みのときおよびボタン二重押しは無効
			break;
		}

		//	計算実行
		calcOperation();

		//	乗除算が完了
		gCalcOperator = OPERATOR_NONE;
		break;
	case gCalback.id:
		//	1字削除
		if ( isCalDone() )
		{
			//	薬用量の出力に対してはボタン無効
			break;
		}

		if ( gValueText.value.length <= 1 )
		{
			//	1字削除すると0字以下になる場合は初期値にする
			gValueText.value = DFLT_VALUE;
		}
		else
		{
			gValueText.value = gValueText.value.substring( 0, gValueText.value.length - 1 );
		}

		gIsMemDetail = false;	//	入出力テキストの表示はメモリの計算結果と異なる (i.e.メモリに計算結果なし)
		break;
	case gCaldot.id:
		//	小数点入力
		if ( gIsMemDetail || isOperatorPushed() )
		{
			//	メモリに計算結果があるか、乗算・除算ボタンを押した直後であれば一旦クリア
			resetCal();
		}

		if ( gValueText.value.length < MAX_LEN_VALUE && gValueText.value.indexOf( '.' ) < 0 )
		{
			gValueText.value += '.';
		}

		gIsMemDetail = false;	//	入出力テキストの表示はメモリの計算結果と異なる (i.e.メモリに計算結果なし)
		break;
	default:
		alert( "Error (id:" + e.target.id + ")" );
		break;
	}

	//	次の操作時の処理のために、直前に押下したボタンの情報を記録する
	//		ただし、乗除算/薬用量計算画面切替えボタンは画面の表示を切り替えるだけで、
	//		前後の計算や入出力テキストには全く影響を及ぼさないので、記録しない
	if ( e.target.id != gAreaChange1.id && e.target.id != gAreaChange2.id )
	{
		gPrevButton = e.target.id;
	}
	return false;
}

/**
 *	桁数ドロップダウンリスト選択変更時の処理
 */
function onChangeUnderPoint()
{
	//	薬用量が出力済みであれば、薬用量を再計算
	if ( isCalDone() )
	{
		calDosage();
	}

	//	メモリに計算結果があれば、計算結果を再表示
	if ( gIsMemDetail )
	{
		setValueText( gCalcMem );
	}
}

/**
 *	計算方法ドロップダウンリスト選択変更時の処理
 */
function onChangeDirection()
{
	adjustDirection();

	if ( isCalDone() )
	{
		calDosage();
	}
}

/**
 *	計算方法ドロップダウンリストで選択されている薬用量の計算方法に合わせて、画面表示を変更する
 *	@return	薬用量の計算方法 (0:順計算, 1:逆計算)
 */
function adjustDirection()
{
	var direction = ( Number( gDirection.value ) != 1 ) ? 0 : 1;	//	計算方法 (0:順計算, 1:逆計算)

	if ( direction == 0 )
	{
		//	ドロップダウンリストの選択がおかしかったらデフォルト(順計算)を選択
		gDirection.selectedIndex = 0;
	}

	//	成人量/小児量テキストのヘッダ文字列設定
	document.getElementById( 'dosageHeader' ).innerHTML = DOSAGE_HEADER_STRINGS[direction];

	//	表のセルの色設定
	document.getElementById( 'dosageHeaderArea' ).style.backgroundColor = TH_BGCOLORS[direction];
	document.getElementById( 'dosageDataArea' ).style.backgroundColor = TD_BGCOLORS[direction];

	document.getElementById( 'ioHeaderArea' ).style.backgroundColor = TH_BGCOLORS[direction];
	document.getElementById( 'ioDataArea' ).style.backgroundColor = TD_BGCOLORS[direction];

	return direction;
}

/**
 *	入出力テキストの表示を初期状態に戻す
 */
function resetCal()
{
	gValueText.value = DFLT_VALUE;
	gUnitText.value = '';

	gIsMemDetail = false;
}

/**
 *	薬用量を計算して、入出力テキストに結果を出力する
 */
function calDosage()
{
	var dosage = 0;		//	算出した薬用量

	if ( adjustDirection() == 0 )
	{
		//	順計算: 入力を成人量として、小児量を算出
		var adult = Number( gInputDosage.value );	//	成人量
		dosage = adult * Math.pow( Number( gChildWeight.value ) / Number( gAdultWeight.value ), 2 / 3 );

		//	小児量は成人量を超えないようにする
		if ( dosage > adult )
		{
			dosage = adult;
		}
	}
	else
	{
		//	逆計算: 入力を小児量として、成人量を算出
		var child = Number( gInputDosage.value );	//	小児量
		dosage = child * Math.pow( Number( gAdultWeight.value ) / Number( gChildWeight.value ), 2 / 3 );
	}

	gCalcMem = dosage;
	gIsMemDetail = true;	//	メモリに計算結果あり

	//	計算結果が上限値を超えたらエラー (無限大扱い) とする
	if ( gCalcMem > MAX_CALC_VALUE )
	{
		gCalcMem = Infinity;
	}

	setValueText( gCalcMem );
	gUnitText.value = UNIT_STRINGS[gDosageUnit];
}

/**
 *	入出力テキストに、選択されている小数点以下桁数を反映させて数値を出力する
 *	@param	value	出力する数値 (非数、無限大はエラー)
 */
function setValueText( value )
{
	if ( isNaN( value ) || value == Infinity )
	{
		//	0 で除算していた場合 (非数、無限大) はエラー
		gValueText.value = ERROR_VALUE;
	}
	else
	{
		gValueText.value = formatDecimal( value, Number( gUnderPoint.value ) );
	}
}

/**
 *	端数を四捨五入して、指定された小数点以下桁数に数値を整形する
 *	@param	value			整形対象の数値
 *	@param	underPoint		小数第何位までに整形するか (0以上の数値を指定すること)
 *	@return	整形した数値 (文字列)
 */
function formatDecimal( value, underPoint )
{
	var formated = '';								//	整形した数値
	var valueString = String( value );				//	対象数値の小数表現文字列化
	var valuePoint = ( valueString.indexOf( '.' ) > 0 ) ? valueString.indexOf( '.' ) : valueString.length;
													//	文字列化した数値の小数点位置
	var pointless = valueString.substring( 0, valuePoint ) + valueString.substring( valuePoint + 1 );
													//	小数点を除去した文字列化数値

	//	String() で数値が指数表現になる場合は、仮数部を使って小数表現に変換する
	//		toFixed( n ) は小数に対して用いると、1.005 が 1.00 になるなど、
	//		誤差が生じることがあるので、信頼性が要求される計算では使えない
	if ( valueString.indexOf( 'e' ) > 0 )
	{
		var valueEs = valueString.split( 'e' );		//	仮数部と指数部
		var valueE = Number( valueEs[1] );			//	指数の値

		valuePoint = ( valueEs[0].indexOf( '.' ) > 0 ) ? valueEs[0].indexOf( '.' ) : valueEs[0].length;
		pointless = valueEs[0].substring( 0, valuePoint ) + valueEs[0].substring( valuePoint + 1 );

		//	指数の分、小数点位置をずらす
		valuePoint += valueE;

		if ( valuePoint <= 0 || ( value < 0 && valuePoint <= 1 ) )
		{
			//	指数部がマイナスのため、先頭の数字が不足している場合
			//	先頭にゼロを追加して、0.0…… の形にする (小数点位置は 1 または 2(負の場合) になる)
			var zeros = '';

			if ( value < 0 )
			{
				zeros = '-';
				pointless = pointless.substring( 1 );
				valuePoint--;
			}

			for ( var i = valuePoint; i <= 0; i++ )
			{
				zeros += '0';
			}
			pointless = zeros + pointless;
			valuePoint = ( value < 0 ) ? 2 : 1;
		}
	}

	//	末尾にゼロを十分な数だけ追加しておく
	for ( var i = 0; i < valuePoint + underPoint; i++ )
	{
		pointless += '0';
	}

	var zeros = '';					//	数値の先頭のゼロおよび符号
	var valueTopNonZero = '0';		//	対象数値の最上位に現れる0以外の数字 (桁上がり判定に用いる)

	//	四捨五入の前に、先頭のゼロおよび符号をキープしておく
	for ( var i = 0; i < pointless.length; i++ )
	{
		if ( pointless.charAt( i ) == '-' || pointless.charAt( i ) == '0' )
		{
			zeros += pointless.charAt( i );
		}
		else
		{
			valueTopNonZero = pointless.charAt( i );
			break;
		}
	}

	var rounded = Math.round( Math.abs(
						Number( pointless.substring( 0, valuePoint + underPoint )
								+ '.' + pointless.substring( valuePoint + underPoint ) ) ) ).toFixed();
													//	桁をずらして四捨五入した数値 (整数)
													//		rounded は整数なので、toFixed() を使ってもOK

	//	四捨五入で最上位が桁上がりしたら、先頭のゼロあり⇒ゼロを減らす / ゼロなし⇒元の小数点位置をずらす
	if ( valueTopNonZero > '1' && rounded.charAt( 0 ) == '1' )
	{
		if ( zeros.length > 0 && zeros.charAt( zeros.length - 1 ) == '0' )
		{
			zeros = zeros.substring( 0, zeros.length - 1 );
		}
		else
		{
			valuePoint++;
		}
	}

	rounded = zeros + rounded;

	//	小数点を入れて整形
	if ( underPoint <= 0 )
	{
		formated = rounded.substring( 0, valuePoint );
	}
	else
	{
		formated = rounded.substring( 0, valuePoint )
						+ '.' + rounded.substring( valuePoint, valuePoint + underPoint );
	}

	return formated;
}

/**
 *	現在表示中の画面が乗除算画面かどうかを調べる
 *	@return	乗除算画面を表示中かどうかのフラグ (boolean)
 */
function isMultiplyMode()
{
	return ( window.getComputedStyle( gMultiplyArea, null ).display == 'table-cell' );
}

/**
 *	直前に乗算・除算ボタンを押下したかどうかを調べる
 *	@return	直前に乗算・除算ボタンを押下したかどうかのフラグ (boolean)
 */
function isOperatorPushed()
{
	return ( gPrevButton == gCalMultiply.id || gPrevButton == gCalDivide.id );
}

/**
 *	計算用メモリおよび入出力テキストを参照して乗除算を行い、入出力テキストに結果を出力する
 */
function calcOperation()
{
	if ( gValueText.value == ERROR_VALUE )
	{
		//	入出力テキストの表示がエラーの場合は何もしない
		return;
	}

	var value = gIsMemDetail ? gCalcMem : Number( gValueText.value );	//	入力値

	if ( gCalcOperator === undefined || gCalcOperator === null )
	{
		//	もし再読み込み等で gCalcOperator が壊れていたら OPERATOR_NONE とする
		gCalcOperator = OPERATOR_NONE;
	}

	//	計算処理 (結果をメモリに格納)
	switch ( gCalcOperator )
	{
	case OPERATOR_NONE:
		//	計算しない (入力＝出力)
		gCalcMem = value;
		break;
	case OPERATOR_MULTI:
		//	乗算
		gCalcMem *= value;
		break;
	case OPERATOR_DIVIDE:
		//	除算
		gCalcMem /= value;
		break;
	default:
		//	エラー
		alert( "Error (gCalcOperator:" + gCalcOperator + ")" );
		return;
	}
	gIsMemDetail = true;	//	メモリに計算結果あり

	//	計算結果が上限値を超えたらエラー (無限大扱い) とする
	if ( gCalcMem > MAX_CALC_VALUE )
	{
		gCalcMem = Infinity;
	}

	//	結果出力
	setValueText( gCalcMem );
}
