#!/usr/bin/awk -f

BEGIN {
	FS = "class ";
	braa = 0;
}

{
	if (NF <= 1 || length($1) != 0) {
		lll = 0;
		if (braa != 0) {
			if (bra == 1 && index($0, ")") != 0) {
				lll = 1;
				gsub("constructor", "ctor", $0);
				gsub("\\(", ": function(", $0);
				printf("%s\n", $0);
			}
			if (bra == 2 && length($0) != 0 &&
			    index($0, "}") == length($0)) {
				lll = 1;
				printf("%s,\n", $0);
			}if (bra == 2 && index($0, "super") != 0) {
				lll = 1;
				gsub("super", "this._super", $0);
				printf("%s\n", $0);
			}
		}

		split($0, lst, "{");
		split($0, ls2, "}");
		bra += length(lst) - length(ls2);

		if (lll == 0) {
			if (braa != 0 && bra <= 0) {
				printf("%s);\n", $0);
				braa = 0;
			} else {
				printf("%s\n", $0);
			}
		}
	} else {
		split($2, lst, " {");
		name = lst[1];
		braa = 1;
		bra = length(lst) - 1;
		split(name, lst, " extends ");
		name = lst[1];
		if (length(lst) == 1) {
			base = "Class";
		} else {
			base = lst[2];
		}
		printf("var %s = %s.extend({\n", name, base);
	}
}
