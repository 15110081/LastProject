package com.grokonez.jwtauthentication.util;

import java.util.HashMap;

public class ApiResponseBuilder {

    private static final String CODE = "code";
    private static final String MESSAGE = "message";
    private static final String DATA = "data";
    private static final String SIZE = "size";
    private static final String ID="id";
    private static int ERROR_CODE = -1;
    private static int SUCCESS_CODE = 0;
    private static int DATA_CODE = 1;

    public static HashMap<String, Object> buildError(String message) {
        return build(ERROR_CODE, message, null);
    }

    public static HashMap<String, Object> buildSuccess(String message) {
        return build(SUCCESS_CODE, message, null);
    }

    public static HashMap<String, Object> buildSuccess(String message, Object data) {
        return build(SUCCESS_CODE, message, data);
    }

    public static HashMap<String, Object> buildContainsData(String message, Object data) {
        return build(DATA_CODE, message, data);
    }
    public static HashMap<String, Object> buildContainsDataSize(String message, Object data,int size) {
        return buildSize(DATA_CODE, message, data,size);
    }

    private static HashMap<String, Object> build(int code, String message, Object data) {
        HashMap<String, Object> res = new HashMap<>();
        res.put(CODE, code);
        res.put(MESSAGE, message);
        res.put(DATA, data);
        return res;
    }
    private static HashMap<String, Object> buildSize(int code, String message, Object data,int size) {
        HashMap<String, Object> res = new HashMap<>();
        res.put(CODE, code);
        res.put(MESSAGE, message);
        res.put(DATA, data);
        res.put(SIZE, size);

        return res;
    }
}
